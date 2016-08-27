using System.Web.Mvc;
using DotWeb.Controller;
using DotWeb.CommSetup;

namespace DotWeb.Controllers
{
    public class IndexController : WebUserController
    {
        public ActionResult Index()
        {
            ViewData["username"] = "";
            ViewData["password"] = "";
            ViewData["validate"] = "";

#if DEBUG
            ViewData["username"] = CommWebSetup.AutoLoginUser;
            ViewData["password"] = CommWebSetup.AutoLoginPassword;
            ViewData["validate"] = "1";
#endif

            return View("Index");
        }
        public ActionResult Notice()
        {
            return View();
        }
        public RedirectResult Login()
        {
            return Redirect("~/Base/Login");
        }
    }

}
