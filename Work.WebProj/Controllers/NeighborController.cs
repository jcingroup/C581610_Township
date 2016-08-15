using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotWeb.Controllers
{
    public class NeighborController : WebUserController
    {
        public ActionResult Index()
        {
            return View("Neighbor");
        }
        public ActionResult List()
        {
            return View("Neighbor_list");
        }

        public ActionResult Content(int id)
        {
            db0 = getDB0();
            var task = db0.Community.FindAsync(id);
            task.Wait();
            var result = task.Result;

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

            if (imgobj_CommunityDoor != null && imgobj_CommunityList?.Count() > 0)
            {
                result.imgurl_CommunityDoor = imgobj_CommunityDoor.Select(x => x.src_path).ToArray();
            }
            else
            {
                result.imgurl_CommunityDoor = new string[] { };
            }

            //var imgobj_MatterStyle = getImgFiles("CommunityPublic", id.ToString(), "origin");
            //if (imgobj_MatterStyle != null && imgobj_MatterStyle.Count() > 0)
            //{
            //    result.imgurl_CommunityPublic = imgobj_MatterStyle.Select(x => x.src_path).ToArray();
            //}
            //else
            //{
            //    result.imgurl_CommunityPublic = new string[] { };
            //}

            result.imgurl_CommunityPublic = new string[] { };

            ViewBag.community_id = id;
            ViewBag.group_buying_url = result.group_buying_url;

            return View("Neighbor_content", result);
        }

        public ActionResult Notice(int id)
        {
            db0 = getDB0();
            var item = db0.Community_Banner.Find(id);

            return View("Notice", item);
        }

        public ActionResult News(int id)
        {
            db0 = getDB0();
            var item = db0.Community_News.Find(id);
            return View("News", item);
        }

        public ActionResult Sell_list(int community_id)
        {
            db0 = getDB0();
            var result = db0.Community.Find(community_id);

            ViewBag.community_id = community_id;
            ViewBag.group_buying_url = result.group_buying_url;
            ViewBag.WebName = result.community_name;

            return View("Neighbor_sell_list");
        }
        public ActionResult Sell_content(int id)
        {
            db0 = getDB0();
            var result = db0.Matter.Find(id);

            ViewBag.community_id = result.community_id;
            ViewBag.group_buying_url = result.Community.group_buying_url;
            ViewBag.WebName = result.community_name;

            return View("Neighbor_sell_content");
        }
        public ActionResult Rent_list(int community_id)
        {
            db0 = getDB0();
            var result = db0.Community.Find(community_id);

            ViewBag.community_id = community_id;
            ViewBag.group_buying_url = result.group_buying_url;
            ViewBag.WebName = result.community_name;
            return View("Neighbor_rent_list");
        }
        public ActionResult Rent_content(int id)
        {
            db0 = getDB0();
            var result = db0.Matter.Find(id);

            ViewBag.community_id = result.community_id;
            ViewBag.group_buying_url = result.Community.group_buying_url;
            ViewBag.WebName = result.community_name;
            return View("Neighbor_rent_content");
        }
    }

}
