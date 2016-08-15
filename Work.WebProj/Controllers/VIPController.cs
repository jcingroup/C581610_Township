using System.Web.Mvc;
using DotWeb.Controller;
using ProcCore.Business.DB0;
using System.Collections.Generic;
using System.Linq;
using ProcCore.HandleResult;
using System;
using DotWeb.CommSetup;

namespace DotWeb.Controllers
{
    public class VIPController : WebUserController
    {
        public ActionResult Index()
        {
            Edit item = new Edit();
            using (var db0 = getDB0())
            {
                #region get content
                item = db0.Edit.Find((int)EditorState.VIP);
                #endregion
            }
            ViewBag.content = item.edit_content;
            return View("VIP");
        }
        [HttpPost]
        public string sendMail(VipEmail md)
        {
            ResultInfo r = new ResultInfo();

            try
            {
                using (db0 = getDB0())
                {
                    
                    #region 信件發送
                    string Body = getMailBody("Email", md);//套用信件版面
                    Boolean mail;
                    string mailfrom = openLogic().getReceiveMails().First();

                    mail = Mail_Send(mailfrom, //寄信人
                                    openLogic().getReceiveMails(), //收信人
                                    CommWebSetup.MailTitle_VIP, //信件標題
                                    Body, //信件內容
                                    true); //是否為html格式
                    if (mail == false)
                    {
                        r.result = false;
                        r.message = Resources.Res.Log_Err_SendMailFail;
                        return defJSON(r);
                    }
                    #endregion
                }
                r.result = true;
                r.message = Resources.Res.Log_Success_SendMail;
            }
            catch (Exception ex)
            {
                r.result = false;
                r.message = ex.Message;
            }
            return defJSON(r);
        }
    }
    public class VipEmail
    {
        public string name { get; set; }
        public bool gender { get; set; }
        public string line_id { get; set; }
        public int birthday_y { get; set; }
        public int birthday_m { get; set; }
        public int birthday_d { get; set; }
        public string mobile { get; set; }
        public string tel { get; set; }
        public string address { get; set; }
        public string job_type { get; set; }
        public string job_name { get; set; }
        public string content { get; set; }
        public string skill { get; set; }
        public string licenses { get; set; }
        public string other_content { get; set; }
        public string response { get; set; }
    }
}
