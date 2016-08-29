using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class FixController : WebUserController
    {
        // GET: Fix
        public ActionResult Index(int? l2_id)
        {
            int l1_id = (int)EditorState.Fix;
            using (var db0 = getDB0())
            {
                l2_id = l2_id == null ? db0.Editor_L2.Where(x => x.editor_l1_id == l1_id & !x.i_Hide).OrderByDescending(x => x.sort).First().editor_l2_id : l2_id;
            }

            CategoryL2Data item = getEditorData(l1_id, (int)l2_id);
            return View("Fix", item);
        }
    }
}