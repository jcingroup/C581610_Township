using System.Web.Mvc;
using DotWeb.Controller;

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

        public ActionResult Content()
        {
            return View();
        }
    }
}