using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class CommentsController : WebUserController
    {
        // GET: Comments
        public ActionResult Index()
        {
            return View("Comments");
        }

        public ActionResult Popup()
        {
            return View();
        }
    }
}