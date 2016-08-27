using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System;
using System.Linq;

namespace DotWeb.WebApp.Controllers
{
    public class NewsController : WebUserController
    {
        // GET: News
        public ActionResult Index()
        {
            return View("list");
        }

        public ActionResult list()
        {
            return View();
        }

        public ActionResult Content(int? id)
        {
            News item;
            using (var db0 = getDB0())
            {
                Boolean Exist = db0.News.Any(x => x.news_id == id && x.i_Hide == false);
                if (id == null || !Exist)
                {
                    return Redirect("~/News/list");
                }
                else
                {
                    item = db0.News.Find(id);
                    //item.imgsrc = GetImg(item.news_id, "Photo1", "NewsData", "Photo", null);//顯示圖片
                }
            }
            return View(item);
        }
    }
}