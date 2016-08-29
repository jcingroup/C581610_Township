using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System;
using System.Linq;
using System.Collections.Generic;

namespace DotWeb.WebApp.Controllers
{
    [Authorize]
    public class NewsController : WebUserController
    {
        // GET: News
        public ActionResult Index()
        {
            return Redirect("~/News/list");
        }

        public ActionResult list()
        {
            List<m_News> items = new List<m_News>();
            using (var db0 = getDB0())
            {
                items = db0.News
                    .Where(x => !x.i_Hide)
                    .OrderByDescending(x => x.day)
                    .Select(x => new m_News()
                    {
                        news_id = x.news_id,
                        day = x.day,
                        news_type = x.news_type,
                        news_title = x.news_title
                    }).ToList();
            }
            return View(items);
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