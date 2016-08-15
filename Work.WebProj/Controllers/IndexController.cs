using System.Web.Mvc;
using DotWeb.Controller;


namespace DotWeb.Controllers
{
    public class IndexController : WebUserController
    {
        public ActionResult Index()
        {
            //var conn = getDb0Connection();
            //conn.Open();

            //var sql = "select * from Matter where sn=@p0";
            //var items = conn.Query<Matter>(sql, new { p0 = "SN001" });
            //conn.Close();

            //var json = defJSON(items);

            return View("Index");
        }
        public RedirectResult Login()
        {
            return Redirect("~/Base/Login");
        }
    }

}
