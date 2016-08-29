using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class EfficacyController : WebUserController
    {
        // GET: Efficacy
        public ActionResult Index()
        {
            CategoryL1Data item = getEditorData((int)EditorState.Efficacy);
            return View("Efficacy", item);
        }
    }
}