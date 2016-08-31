using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;
using System.Collections.Generic;

namespace DotWeb.WebApp.Controllers
{
    [Authorize]
    public class ServiceController : WebUserController
    {
        // GET: Service
        public ActionResult Index()
        {
            ServerInfo info = new ServerInfo();
            return View("Self");
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
            Facility item = new Facility();
            using (var db0 = getDB0())
            {
                bool check = db0.Facility.Any(x => x.facility_id == id & !x.i_Hide);
                if (!check || id == null)
                {
                    return Redirect("~/Service");
                }
                item = db0.Facility.Find(id);

                var img = getImgFirst("FacilityOrder", id.ToString(), "150");
                if (img != null)
                {
                    item.img_src = img.src_path;
                }
            }
            return View(item);
        }
    }
    public class m_facility
    {
        public int id { get; set; }
        public string name { get; set; }
    }
    public class ServerInfo
    {
        public List<option> facility { get; set; }
    }
}