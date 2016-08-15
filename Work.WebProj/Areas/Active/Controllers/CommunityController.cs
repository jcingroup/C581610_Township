using DotWeb.CommSetup;
using DotWeb.Controller;
using ProcCore.Business.LogicConect;
using ProcCore.HandleResult;
using System;
using System.IO;
using System.Web.Mvc;
using System.Linq;

namespace DotWeb.Areas.Active.Controllers
{
    public class CommunityController : AdminController
    {
        #region Action and function section
        public ActionResult Main()
        {
            ActionRun();
            return View();
        }

        public ActionResult Redux()
        {
            ActionRun();
            return View();
        }
        #endregion
    }
}