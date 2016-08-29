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
            m_Editor item = new m_Editor();
            using (var db0 = getDB0())
            {
                #region get content

                item = db0.Editor
                    .Where(x => !x.i_Hide & x.editor_id == (int)EditorState.AboutUs)
                    .OrderByDescending(x => x.sort)
                    .Select(x => new m_Editor()
                    {
                        id = x.editor_id,
                        name = x.name,
                        UpdateDatetime = x.i_UpdateDateTime,
                        detail = x.EditorDetail
                                .OrderByDescending(y => y.sort)
                                .Select(y => new m_EditorDetail()
                                {
                                    id = y.editor_detail_id,
                                    name = y.detail_name,
                                    sort = y.sort,
                                    content = y.detail_content
                                })
                    }).FirstOrDefault();

                #endregion
            }
            return View("AboutUs", item);
        }
    }

    public class m_EditorDetail
    {
        public int id { get; set; }
        public string name { get; set; }
        public int? sort { get; set; }
        public string content { get; set; }
    }
    public class m_Editor
    {
        public int id { get; set; }
        public string name { get; set; }
        public DateTime? UpdateDatetime { get; set; }
        public IEnumerable<m_EditorDetail> detail { get; set; }
    }
}