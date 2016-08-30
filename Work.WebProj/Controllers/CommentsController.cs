using System.Web.Mvc;
using DotWeb.Controller;
using System.Collections.Generic;
using ProcCore.Business.DB0;
using System.Linq;
using System;
using ProcCore.HandleResult;

namespace DotWeb.WebApp.Controllers
{
    [Authorize]
    public class CommentsController : WebUserController
    {
        // GET: Comments
        public ActionResult Index()
        {
            CommentsInfo info = new CommentsInfo();
            using (var db0 = getDB0())
            {
                info.my_msg = new List<m_MsgBoard>();
                info.msg = db0.MsgBoard
                         .Where(x => x.state == (int)MsgState.SuccessAndShow)
                         .OrderByDescending(x => x.i_InsertDateTime)
                         .Select(x => new m_MsgBoard()
                         {
                             id = x.msg_board_id,
                             type_name = x.MsgType.name,
                             q_time = x.i_InsertDateTime,
                             title = x.q_title,
                             q_content = x.q_content,
                             a_content = x.a_content
                         }).ToList();

                info.option = db0.MsgType
                               .OrderBy(x => x.msg_type_id)
                               .Select(x => new option()
                               {
                                   val = x.msg_type_id,
                                   Lname = x.name
                               }).ToList();
                if (this.MemberId != null)
                {
                    int member_id = int.Parse(this.MemberId);
                    DateTime m3 = DateTime.Now.AddMonths(-3);
                    info.my_msg = db0.MsgBoard
                             .Where(x => !(x.i_InsertDateTime < m3 & (x.state == (int)MsgState.SuccessAndShow || x.state == (int)MsgState.SuccessAndHide))
                                         & x.resident_id == member_id)
                             .OrderByDescending(x => x.i_InsertDateTime)
                             .Select(x => new m_MsgBoard()
                             {
                                 id = x.msg_board_id,
                                 type_name = x.MsgType.name,
                                 state = x.state,
                                 q_time = x.i_InsertDateTime,
                                 title = x.q_title,
                                 q_content = x.q_content,
                                 a_content = x.a_content
                             }).ToList();
                }
            }
            return View("Comments", info);
        }

        public ActionResult Popup()
        {
            return View();
        }

        [HttpPost]
        public string sendMsg(MsgBoard md)
        {
            ResultInfo r = new ResultInfo();

            try
            {
                if (this.MemberId == null)
                {
                    r.result = false;
                    r.message = Resources.Res.Msg_Err_NotLoginResident;
                    return defJSON(r);
                }
                r = addMsgBoard(md);
            }
            catch (Exception ex)
            {
                r.result = false;
                r.message = ex.Message;
            }
            return defJSON(r);
        }
    }
    public class m_MsgBoard
    {
        public int id { get; set; }
        public int state { get; set; }
        public string type_name { get; set; }
        public string title { get; set; }
        public DateTime? q_time { get; set; }
        public string q_content { get; set; }
        public string a_content { get; set; }
    }
    public class CommentsInfo
    {
        public List<m_MsgBoard> msg { get; set; }
        public List<m_MsgBoard> my_msg { get; set; }
        public List<option> option { get; set; }
    }
}