using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System;
using ProcCore.HandleResult;

namespace DotWeb.WebApp.Controllers
{
    [Authorize]
    public class ServiceController : WebUserController
    {
        // GET: Service
        public ActionResult Index()
        {
            ServerInfo info = new ServerInfo();
            using (var db0 = getDB0())
            {
                info.reserve = new List<m_reserve>();
                info.facility = db0.Facility
                                 .Where(x => !x.i_Hide)
                                 .Select(x => new CategoryL1Data()
                                 {
                                     id = x.facility_id,
                                     name = x.name
                                 }).ToList();
                if (this.MemberId != null)
                {
                    int member_id = int.Parse(this.MemberId);
                    info.reserve = db0.Reserve
                                    .Where(x => x.resident_id == member_id)
                                    .OrderByDescending(x => x.i_InsertDatetime)
                                    .Select(x => new m_reserve()
                                    {
                                        id = x.reserve_id,
                                        f_id = x.facility_id,
                                        m_id = x.resident_id,
                                        f_name = x.Facility.name,
                                        person = x.person,
                                        day = x.day,
                                        s_time = x.s_time,
                                        e_time = x.e_time,
                                        InsertDatetime = x.i_InsertDatetime,
                                        name = x.Resident.resident_name,
                                        tel = x.Resident.tel,
                                        state = x.state,
                                        fail_info = x.fail_info
                                    }).ToList();
                }
            }
            return View("Self", info);
        }

        public ActionResult Reserve(int? id)
        {
            Facility item = new Facility();
            using (var db0 = getDB0())
            {
                bool check = db0.Facility.Any(x => x.facility_id == id & !x.i_Hide);
                if (!check || id == null)
                {
                    return Redirect("~/Service");
                }
                item = db0.Facility.Find(id);
            }
            return View(item);
        }

        public ActionResult Order(int? id)
        {
            OrderInfo info = new OrderInfo();
            using (var db0 = getDB0())
            {
                bool check = db0.Facility.Any(x => x.facility_id == id & !x.i_Hide);
                if (!check || id == null)
                {
                    return Redirect("~/Service");
                }
                info.item = db0.Facility.Find(id);

                var img = getImgFirst("FacilityOrder", id.ToString(), "150");
                if (img != null)
                {
                    info.item.img_src = img.src_path;
                }
                info.name = ViewBag.r_name;
                info.no = ViewBag.r_no;
                info.tel = ViewBag.r_tel;
                info.gender = ViewBag.r_gender;
            }
            return View(info);
        }

        [HttpPost]
        public string sendOrder(Reserve md)
        {
            ResultInfo r = new ResultInfo();

            try
            {
                if (this.MemberId == null)
                {
                    r.result = false;
                    r.message = Resources.Res.Msg_Err_NotLoginResident;
                    return defJSON(r);
                }
                if (md.s_time >= md.e_time)
                {
                    r.result = false;
                    r.message = Resources.Res.Order_Err_TimeAbnormal;
                    return defJSON(r);
                }
                using (var db0 = getDB0())
                {
                    var fdata = db0.Facility.Find(md.facility_id);
                    if (md.s_time < fdata.s_date || md.e_time > fdata.e_date)
                    {
                        r.result = false;
                        r.message = string.Format(Resources.Res.Order_Err_Close, fdata.name);
                        return defJSON(r);
                    }
                    if (!fdata.same)
                    {
                        bool check = db0.Reserve.Any(x => x.facility_id == md.facility_id &
                                                        x.state >= 0 &
                                                        x.day == md.day &
                                                        (md.s_time >= x.s_time & md.s_time <= x.e_time) ||
                                                        (md.e_time >= x.s_time & md.e_time <= x.e_time));
                        if (check)
                        {
                            r.result = false;
                            r.message = string.Format(Resources.Res.Order_Err_Same, fdata.name);
                            return defJSON(r);
                        }
                    }
                }
                r = addReserve(md);
            }
            catch (Exception ex)
            {
                r.result = false;
                r.message = ex.Message;
            }
            return defJSON(r);
        }

        [HttpPost]
        public string cancelOrder(int id)
        {
            ResultInfo r = new ResultInfo();

            try
            {

                if (this.MemberId == null)
                {
                    r.result = false;
                    r.message = Resources.Res.Msg_Err_NotLoginResident;
                    return defJSON(r);
                }
                using (var db0 = getDB0())
                {
                    int member_id = int.Parse(this.MemberId);
                    bool check = db0.Reserve.Any(x => x.reserve_id == id & x.resident_id == member_id);
                    if (!check)
                    {
                        r.result = false;
                        r.message = Resources.Res.Order_Err_NoFind;
                        return defJSON(r);
                    }
                    var item = db0.Reserve.Find(id);
                    item.state = (int)ReserveState.Cancel;

                    db0.SaveChanges();
                }
                r.result = true;
                r.message = Resources.Res.Order_Cancel_Success;
            }
            catch (Exception ex)
            {
                r.result = false;
                r.message = ex.Message;
            }
            return defJSON(r);
        }
    }
    public class m_reserve
    {
        public int id { get; set; }
        public int f_id { get; set; }
        public int m_id { get; set; }
        public DateTime InsertDatetime { get; set; }
        public string f_name { get; set; }
        public int person { get; set; }
        public DateTime day { get; set; }
        public TimeSpan s_time { get; set; }
        public TimeSpan e_time { get; set; }
        public string name { get; set; }
        public string tel { get; set; }
        public int state { get; set; }
        public string fail_info { get; set; }
    }
    public class OrderInfo
    {
        public string name { get; set; }
        public string tel { get; set; }
        public string no { get; set; }
        public string gender { get; set; }
        public Facility item { get; set; }
    }
    public class ServerInfo
    {
        public List<CategoryL1Data> facility { get; set; }
        public List<m_reserve> reserve { get; set; }
    }
}