using DotWeb.CommSetup;
using DotWeb.Controller;
using ProcCore.Business.LogicConect;
using ProcCore.HandleResult;
using System;
using System.IO;
using System.Web.Mvc;
using System.Linq;
using ProcCore.Business.DB0;

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
        public ActionResult AboutUs()
        {
            ActionRun();
            ViewBag.id = (int)EditorState.AboutUs;
            return View();
        }
        public ActionResult Assets()
        {
            ActionRun();
            ViewBag.id = (int)EditorState.Assets;
            return View();
        }
        public ActionResult Efficacy()
        {
            ActionRun();
            ViewBag.id = (int)EditorState.Efficacy;
            return View();
        }
        public ActionResult Group()
        {
            ActionRun();
            ViewBag.id = (int)EditorState.Group;
            return View();
        }
        public ActionResult Management()
        {
            ActionRun();
            ViewBag.id = (int)EditorState.Management;
            return View();
        }
        public ActionResult Fix()
        {
            ActionRun();
            ViewBag.id = (int)EditorState.Fix;
            return View();
        }
        #endregion
    }
}