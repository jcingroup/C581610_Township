using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System.Linq;
using System;

namespace DotWeb.WebApp.Controllers
{
    public class AboutUsController : WebUserController
    {
        // GET: AboutUs
        public ActionResult Index(int? l2_id)
        {
            int l1_id = (int)EditorState.AboutUs;
            using (var db0 = getDB0())
            {
                l2_id = l2_id == null ? db0.Editor_L2.Where(x => x.editor_l1_id == l1_id & !x.i_Hide).OrderByDescending(x => x.sort).First().editor_l2_id : l2_id;
            }

            CategoryL2Data item = getEditorData(l1_id, (int)l2_id);
            return View("AboutUs", item);
        }
    }
}