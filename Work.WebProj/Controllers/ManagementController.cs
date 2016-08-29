using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class ManagementController : WebUserController
    {
        // GET: Management
        public ActionResult Index()
        {
            CategoryL1Data item = getEditorData((int)EditorState.Management);
            return View("Management", item);
        }
    }
}