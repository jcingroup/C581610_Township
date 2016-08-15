using DotWeb.WebApp.Models;
using ProcCore.Business.LogicConect;
using ProcCore.HandleResult;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Runtime.Caching;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using System.IO;
using ProcCore.Business.DB0;
using ProcCore;
using DotWeb.CommSetup;
using System.Web;
using ProcCore.WebCore;
using DotWeb.Helpers;
using LinqKit;

namespace DotWeb.Api
{
    public class GetActionController : ajaxBaseApi
    {
        public async Task<IHttpActionResult> GetInsertRoles()
        {
            var system_roles = await roleManager.Roles.Where(x => x.Name != "Admins").ToListAsync();
            IList<UserRoleInfo> obj = new List<UserRoleInfo>();
            foreach (var role in system_roles)
            {
                obj.Add(new UserRoleInfo() { role_id = role.Id, role_name = role.Name, role_use = false });
            }
            return Ok(obj);
        }
        public async Task<IHttpActionResult> GetMenuQuery()
        {
            if (UserId == null)
                return null;

            ObjectCache cache = MemoryCache.Default;
            string cache_name = "m." + UserId;
            string json_context = (string)cache[cache_name];
            string path = System.Web.Hosting.HostingEnvironment.MapPath(string.Format("/_code/cache/m.{0}.json", UserId));

            if (json_context == null)
            {
                #region data access
                db0 = getDB0();
                IList<MenuDef> m1 = new List<MenuDef>();
                var menus = await db0.Menu.Where(x => x.is_use == true).ToListAsync();
                foreach (var menu in menus)
                {
                    var menu_roles = menu.AspNetRoles.Select(x => x.Id).ToList();
                    bool exits;
                    if (UserRoles.Any(x => x == "7b556351-4072-465b-8cf1-f02fa28ba3ca"))
                    {
                        exits = true;
                    }
                    else
                    {
                        exits = menu_roles.Intersect(UserRoles).Any(); //檢查 User roles是否與 menu roles是否有交集
                    }

                    if (exits)
                    {
                        var o = new MenuDef();
                        o.Area = menu.area == null ? string.Empty : menu.area;
                        o.Controller = menu.controller == null ? string.Empty : menu.controller;
                        o.Action = menu.action == null ? string.Empty : menu.action;

                        o.Title = menu.menu_name;
                        o.Clickable = !menu.is_folder;
                        o.Key = menu.menu_id;
                        o.ParentKey = menu.parent_menu_id;
                        o.sort = menu.sort;
                        o.Checked = false;
                        o.IconClass = menu.icon_class;
                        m1.Add(o);
                    }
                }
                db0.Dispose();
                #endregion

                //樹狀處理
                //var t1 = m1.Where(x => x.ParentKey == 0).OrderBy(x => x.sort);
                //foreach (var t2 in t1)
                //{
                //    t2.sub = ReMarkMenuTree(t2, m1);
                //}
                var result_obj = m1.OrderBy(x => x.sort);

                json_context = JsonConvert.SerializeObject(result_obj,
                    new JsonSerializerSettings()
                    {
                        NullValueHandling = NullValueHandling.Ignore
                    }
                    );
                File.WriteAllText(path, json_context);

                IList<string> paths = new List<string>();
                paths.Add(path);

                CacheItemPolicy policy = new CacheItemPolicy();
                policy.AbsoluteExpiration = DateTimeOffset.Now.AddHours(1);
                policy.ChangeMonitors.Add(new HostFileChangeMonitor(paths));
                cache.Set(cache_name, json_context, policy);

                return Ok(result_obj);
            }
            else
            {
                var result_obj = JsonConvert.DeserializeObject<IList<MenuDef>>(json_context);
                return Ok(result_obj);
            }
        }
        public async Task<IHttpActionResult> GetOptionsCommunity()
        {
            db0 = getDB0();
            var options = await db0.Community.Select(x => new { x.community_id, x.community_name }).OrderBy(x => x.community_id).ToListAsync();
            return Ok(options);
        }
        private IList<MenuDef> ReMarkMenuTree(MenuDef t2, IList<MenuDef> data)
        {
            var t3 = data.Where(x => x.ParentKey == t2.Key);
            IList<MenuDef> s = new List<MenuDef>();
            if (!t3.Any())
            {
                return s;
            }

            foreach (var t4 in t3)
            {
                t4.sub = ReMarkMenuTree(t4, data);
            }
            return t3.ToList();
        }

        #region 後台-參數設定
        [HttpPost]
        public ResultInfo PostAboutUs([FromBody]AboutUsParm md)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                var open = openLogic();
                md.aboutus = RemoveScriptTag(md.aboutus);//移除script標籤

                open.setParmValue(ParmDefine.AboutUs, md.aboutus);

                rAjaxResult.result = true;
            }
            catch (Exception ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.message = ex.Message;
            }
            return rAjaxResult;
        }

        #endregion
        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> SearchMatter([FromUri]queryParam q)
        {
            db0 = getDB0();
            var predicate = PredicateBuilder.True<Matter>();

            if (q.info_type != null)
                predicate = predicate.And(x => x.info_type == q.info_type);

            if (q.city != null)
                predicate = predicate.And(x => x.city == q.city);

            if (q.price_bottom != null)
                predicate = predicate.And(x => x.price >= q.price_bottom);

            if (q.price_top != null)
                predicate = predicate.And(x => x.price <= q.price_top);

            if (q.community_id != null)
                predicate = predicate.And(x => x.community_id == q.community_id);

            predicate = predicate.And(x => x.state == "A");

            var result = await db0.Matter.AsExpandable()
                .Where(predicate)
                .Select(x => new SearchMatterObj()
                {
                    matter_id = x.matter_id,
                    matter_name = x.matter_name,
                    title = x.title,
                    price = x.price,
                    age = x.age,
                    city = x.city,
                    country = x.country,
                    address = x.address,
                    balcony_area = x.balcony_area,
                    bathrooms = x.bathrooms,
                    bedrooms = x.bedrooms,
                    parking = x.parking,
                    rooms = x.rooms,
                    livingrooms = x.livingrooms,
                    build_area = x.build_area,
                    house_area = x.house_area,
                    rentOfMonh = x.rentOfMonh,
                    site_floor = x.site_floor,
                    total_floor = x.total_floor
                })
                .ToListAsync(); ;

            foreach (var item in result)
            {
                //var imgobj = getImgFirst("MatterList", item.matter_id.ToString(), "origin");
                var imgobj = getImgFiles("MatterPhoto", item.matter_id.ToString(), "origin");
                if (imgobj != null)
                {
                    item.list_src = imgobj == null ? null : imgobj.First().src_path;
                }
            }


            return Ok(result);
        }
        public class SearchMatterObj : Matter
        {
            public string list_src { get; set; }

        }
        public class queryParam
        {
            public string info_type { get; set; }
            public string city { get; set; }
            public int? price_bottom { get; set; }
            public int? price_top { get; set; }
            public int? community_id { get; set; }
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetMatter(int id)
        {
            db0 = getDB0();
            var result = await db0.Matter.FindAsync(id);
            result.community_name = result.Community.community_name;

            var imgobj_MatterPhoto = getImgFiles("MatterPhoto", id.ToString(), "origin");

            if (imgobj_MatterPhoto != null)
            {
                result.imgurl_MatterPhoto = imgobj_MatterPhoto.Select(x => x.src_path).ToArray();
            }
            else
            {
                result.imgurl_MatterPhoto = new string[] { };
            }

            if (imgobj_MatterPhoto != null && imgobj_MatterPhoto.Count() > 0)
            {
                result.imgurl_MatterPhoto_1 = imgobj_MatterPhoto.FirstOrDefault().src_path;
            }
            else
            {
                result.imgurl_MatterPhoto_1 = string.Empty;
            }

            var imgobj_MatterStyle = getImgFiles("MatterStyle", id.ToString(), "origin");
            if (imgobj_MatterStyle != null && imgobj_MatterStyle.Count() > 0)
            {
                result.imgurl_MatterStyle = imgobj_MatterStyle.FirstOrDefault().src_path;
            }
            else
            {
                result.imgurl_MatterStyle = string.Empty;
            }

            var r = new ResultInfo<Matter>();
            r.result = true;
            r.data = result;
            return Ok(r);
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> SearchCommunity([FromUri]queryParam q)
        {
            db0 = getDB0();
            var predicate = PredicateBuilder.True<Community>();

            //if (q.city != null)
            //    predicate = predicate.And(x => x.community_name == q.city);

            //predicate = predicate.And(x => x.s == "A");

            var result = await db0.Community.AsExpandable()
                .Where(predicate)
                .Select(x => new SearchCommunityObj()
                {
                    community_id = x.community_id,
                    community_name = x.community_name,
                    address = x.address,
                    holders = x.holders,
                    manage = x.manage,
                    age = x.age
                })
                .ToListAsync(); ;

            foreach (var item in result)
            {
                var imgobj = getImgFirst("CommunityList", item.community_id.ToString(), "origin");
                item.list_src = imgobj == null ? null : imgobj.src_path;
            }


            return Ok(result);
        }
        public class SearchCommunityObj : Community
        {
            public string list_src { get; set; }
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetCommunity(int id)
        {
            db0 = getDB0();
            var result = await db0.Community.FindAsync(id);

            var imgobj_CommunityList = getImgFiles("CommunityList", id.ToString(), "origin");

            if (imgobj_CommunityList != null)
            {
                result.imgurl_CommunityList = imgobj_CommunityList.Select(x => x.src_path).FirstOrDefault();
            }
            else
            {
                result.imgurl_CommunityList = string.Empty;
            }

            var imgobj_CommunityDoor = getImgFiles("CommunityDoor", id.ToString(), "origin");

            if (imgobj_CommunityDoor != null && imgobj_CommunityList.Count() > 0)
            {
                result.imgurl_CommunityDoor = imgobj_CommunityDoor.Select(x => x.src_path).ToArray();
            }
            else
            {
                result.imgurl_CommunityDoor = new string[] { };
            }

            var imgobj_MatterStyle = getImgFiles("CommunityPublic", id.ToString(), "origin");
            if (imgobj_MatterStyle != null && imgobj_MatterStyle.Count() > 0)
            {
                result.imgurl_CommunityPublic = imgobj_MatterStyle.Select(x => x.src_path).ToArray();
            }
            else
            {
                result.imgurl_CommunityPublic = new string[] { };
            }

            var r = new ResultInfo<Community>();
            r.result = true;
            r.data = result;
            return Ok(r);
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetNewsList(int id)
        {
            db0 = getDB0();


            var predicate = PredicateBuilder.True<Community_News>();
            predicate = predicate.And(x => x.start_date <= DateTime.Now);
            predicate = predicate.And(x => x.end_date >= DateTime.Now);
            predicate = predicate.And(x => x.state == "A");
            predicate = predicate.And(x => x.community_id == id);

            var result = await db0.Community_News.AsExpandable()
                .OrderByDescending(x => x.community_id)
                .Where(predicate)
                .ToListAsync();

            //var r = new ResultInfo<Matter>();
            //r.result = true;
            //r.data = result;
            return Ok(result);
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IHttpActionResult> GetCommunityBannerList(int id)
        {
            db0 = getDB0();

            var predicate = PredicateBuilder.True<Community_Banner>();
            predicate = predicate.And(x => x.start_date <= DateTime.Now);
            predicate = predicate.And(x => x.end_date >= DateTime.Now);
            predicate = predicate.And(x => x.state == "A");
            predicate = predicate.And(x => x.community_id == id);

            var result = await db0.Community_Banner.AsExpandable()
                .OrderByDescending(x => x.community_id)
                .Where(predicate)
                .Select(x => new _Community_Banner
                {
                    community_banner_id = x.community_banner_id,
                    title = x.title
                })
                .ToListAsync();

            foreach (var item in result)
            {
                var imgobj = getImgFirst("BannerList", item.community_banner_id.ToString(), "origin");
                item.imgurl_CommunityBannerPhoto_1 = imgobj == null ? null : imgobj.src_path;
            }

            return Ok(result);
        }


        private class _Community_Banner
        {
            public int community_banner_id { get; set; }
            public int community_id { get; set; }
            public string title { get; set; }
            public string context { get; set; }
            public DateTime? start_date { get; set; }
            public DateTime? end_date { get; set; }
            public string state { get; set; }
            public string imgurl_CommunityBannerPhoto_1 { get; set; }

        }
    }
    #region Parm

    public class AboutUsParm
    {
        public string aboutus { get; set; }
    }
    #endregion
}
