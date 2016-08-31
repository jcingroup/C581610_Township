using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class MemberController : WebUserController
    {
        // GET: Member
        public ActionResult Index()
        {
            Resident item = new Resident();
            using (var db0 = getDB0())
            {
                if (this.MemberId != null)
                {
                    int member_id = int.Parse(this.MemberId);
                    item = db0.Resident.Find(member_id);
                }
            }
            return View("Edit", item);
        }
    }
}