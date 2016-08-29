using System.Web.Mvc;
using DotWeb.Controller;
using DotWeb.CommSetup;
using System.Collections.Generic;
using ProcCore.Business.DB0;
using System.Linq;
using System;

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

                info.editors = db0.Editor_L2
                    .Where(x => !x.i_Hide)
                    .OrderByDescending(x => x.i_UpdateDateTime)
                    .Take(6)
                    .Select(x => new UpdateEditor()
                    {
                        l2_id = x.editor_l2_id,
                        url = x.Editor_L1.url,
                        l1_name = x.Editor_L1.name,
                        l2_name = x.l2_name,
                        update_time = x.i_UpdateDateTime
                    }).ToList();

            }

            return View(info);
        }
        public RedirectResult Login()
        {
            return Redirect("~/Base/Login");
        }
    }
    public class UpdateEditor
    {
        public int l2_id { get; set; }
        public string url { get; set; }
        public string l1_name { get; set; }
        public string l2_name { get; set; }
        public DateTime? update_time { get; set; }
    }
    public class IndexInfo
    {
        public List<m_News> news { get; set; }
        public List<UpdateEditor> editors { get; set; }
    }

}
