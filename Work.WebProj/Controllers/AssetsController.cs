using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class AssetsController : WebUserController
    {
        // GET: Assets
        public ActionResult Index()
        {
            CategoryL1Data item = getEditorData((int)EditorState.Assets);
            return View("Assets",item);
        }
    }
}