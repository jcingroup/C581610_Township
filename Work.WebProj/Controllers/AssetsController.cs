using System.Web.Mvc;
using DotWeb.Controller;
using System.Linq;
using ProcCore.Business.DB0;

namespace DotWeb.WebApp.Controllers
{
    public class AssetsController : WebUserController
    {
        // GET: Assets
        public ActionResult Index()
        {
            m_Editor item = new m_Editor();
            using (var db0 = getDB0())
            {
                #region get content

                item = db0.Editor
                    .Where(x => !x.i_Hide & x.editor_id == (int)EditorState.Assets)
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
            return View("Assets",item);
        }
    }
}