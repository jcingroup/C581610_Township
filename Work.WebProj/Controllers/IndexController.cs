using System.Web.Mvc;
using DotWeb.Controller;
using DotWeb.CommSetup;
using System.Collections.Generic;
using ProcCore.Business.DB0;
using System.Linq;

namespace DotWeb.Controllers
{
    public class IndexController : WebUserController
    {
        public ActionResult Index()
        {
            ViewData["username"] = "";
            ViewData["password"] = "";
            ViewData["validate"] = "";

#if DEBUG
            ViewData["username"] = CommWebSetup.AutoLoginUser;
            ViewData["password"] = CommWebSetup.AutoLoginPassword;
            ViewData["validate"] = "1";
#endif

            return View("Index");
        }
        [Authorize]
        public ActionResult Notice()
        {
            IndexInfo info = new IndexInfo();
            using (var db0 = getDB0())
            {
                info.news = db0.News
                    .Where(x => !x.i_Hide)
                    .OrderByDescending(x => x.day)
                    .Take(8)
                    .Select(x => new m_News()
                    {
                        news_id = x.news_id,
                        day = x.day,
                        news_type = x.news_type,
                        news_title = x.news_title
                    }).ToList();
            }

            return View(info);
        }
        public RedirectResult Login()
        {
            return Redirect("~/Base/Login");
        }
    }
    public class IndexInfo
    {
        public List<m_News> news { get; set; }
    }

}
