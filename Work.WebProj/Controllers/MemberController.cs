﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using DotWeb.Controller;

namespace DotWeb.WebApp.Controllers
{
    public class MemberController : WebUserController
    {
        // GET: Member
        public ActionResult Index()
        {
            return View("Edit");
        }
    }
}