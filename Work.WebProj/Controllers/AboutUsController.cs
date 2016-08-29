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
        public ActionResult Index()
        {
            CategoryL1Data item = getEditorData((int)EditorState.AboutUs);
            return View("AboutUs", item);
        }
    }
}