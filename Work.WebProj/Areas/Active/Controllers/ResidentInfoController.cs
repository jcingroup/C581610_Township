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
    [Authorize(Roles = "Admins,Managers")]
    public class ResidentInfoController : AdminController
    {
        #region Action and function section
        public ActionResult News()
        {//最新消息
            ActionRun();
            return View();
        }
        public ActionResult Comments()
        {//留言板
            ActionRun();
            return View();
        }
        public ActionResult Service()
        {//預約公設
            ActionRun();
            return View();
        }
        #endregion
    }
}