using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class ExplainController : WebUserController
    {
        // GET: Explain
        public ActionResult Index()
        {
            return View("Explain");
        }
    }
}