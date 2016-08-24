using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class AssetsController : WebUserController
    {
        // GET: Assets
        public ActionResult Index()
        {
            return View("Assets");
        }
    }
}