using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    [Authorize]
    public class ServiceController : WebUserController
    {
        // GET: Service
        public ActionResult Index()
        {
            return View("Self");
        }

        public ActionResult Reserve()
        {
            return View();
        }
    }
}