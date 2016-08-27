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
    public class EditorsController : AdminController
    {
        #region Action and function section
        public ActionResult Main()
        {//總編輯器管理
            ActionRun();
            return View();
        }
        #endregion
    }
}