using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class GroupController : WebUserController
    {
        // GET: Group
        public ActionResult Index()
        {
            CategoryL1Data item = getEditorData((int)EditorState.Group);
            return View("Group", item);
        }
    }
}