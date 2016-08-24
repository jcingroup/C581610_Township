using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class EfficacyController : WebUserController
    {
        // GET: Efficacy
        public ActionResult Index()
        {
            return View("Efficacy");
        }
    }
}