using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class ManagementController : WebUserController
    {
        // GET: Management
        public ActionResult Index()
        {
            return View("Management");
        }
    }
}