using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class FixController : WebUserController
    {
        // GET: Fix
        public ActionResult Index()
        {
            CategoryL1Data item = getEditorData((int)EditorState.Fix);
            return View("Fix", item);
        }
    }
}