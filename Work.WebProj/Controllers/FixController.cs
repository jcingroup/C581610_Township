using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class FixController : WebUserController
    {
        // GET: Fix
        public ActionResult Index()
        {
            return View("Fix");
        }
    }
}