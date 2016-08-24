using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class GroupController : WebUserController
    {
        // GET: Group
        public ActionResult Index()
        {
            return View("Group");
        }
    }
}