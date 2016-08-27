using LinqKit;
using ProcCore.Business;
using ProcCore.Business.DB0;
using ProcCore.HandleResult;
using ProcCore.WebCore;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;


namespace DotWeb.Api
{
    [RoutePrefix("api/EditorDetail")]
    public class EditorDetailController : ajaxApi<EditorDetail>
    {
        public async Task<IHttpActionResult> Get([FromUri] int id)
        {
            using (db0 = getDB0())
            {
                EditorDetail item = await db0.EditorDetail.FindAsync(id);
                var r = new ResultInfo<EditorDetail>() { data = item };
                return Ok(r);
            }
        }
        public async Task<IHttpActionResult> Get([FromUri]queryParam q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            db0 = getDB0();
            var predicate = PredicateBuilder.True<EditorDetail>();

            if (q.keyword != null)
                predicate = predicate.And(x => x.detail_name.Contains(q.keyword));

            int page = (q.page == null ? 1 : (int)q.page);
            var result = db0.EditorDetail.AsExpandable().Where(predicate);
            var resultCount = await result.CountAsync();

            int startRecord = PageCount.PageInfo(page, defPageSize, resultCount);
            var resultItems = await result
                .OrderByDescending(x => x.sort)
                .Skip(startRecord)
                .Take(defPageSize)
                .ToListAsync();

            db0.Dispose();

            return Ok(new
            {
                rows = resultItems,
                total = PageCount.TotalPage,
                page = PageCount.Page,
                records = PageCount.RecordCount,
                startcount = PageCount.StartCount,
                endcount = PageCount.EndCount
            });

            #endregion
        }
        public async Task<IHttpActionResult> Put([FromBody]putBodyParam param)
        {
            ResultInfo rAjaxResult = new ResultInfo();
            try
            {
                db0 = getDB0();

                item = await db0.EditorDetail.FindAsync(param.id);
                var md = param.md;
                item.detail_name = md.detail_name;
                item.detail_content = md.detail_content;
                item.sort = md.sort;
                item.i_Hide = md.i_Hide;

                item.i_UpdateDateTime = DateTime.Now;
                item.i_UpdateDeptID = departmentId;
                item.i_UpdateUserID = UserId;

                await db0.SaveChangesAsync();
                rAjaxResult.result = true;
            }
            catch (Exception ex)
            {
                rAjaxResult.result = false;
                rAjaxResult.message = ex.ToString();
            }
            finally
            {
                db0.Dispose();
            }
            return Ok(rAjaxResult);
        }
        public async Task<IHttpActionResult> Post([FromBody]EditorDetail md)
        {
            md.editor_detail_id = GetNewId(CodeTable.EditorDetail);

            md.i_InsertDateTime = DateTime.Now;
            md.i_InsertDeptID = departmentId;
            md.i_InsertUserID = UserId;
            md.i_UpdateDateTime = DateTime.Now;
            md.i_UpdateDeptID = departmentId;
            md.i_UpdateUserID = UserId;
            md.i_Lang = "zh-TW";
            r = new ResultInfo<EditorDetail>();
            if (!ModelState.IsValid)
            {
                r.message = ModelStateErrorPack();
                r.result = false;
                return Ok(r);
            }

            try
            {
                #region working
                db0 = getDB0();

                db0.EditorDetail.Add(md);
                await db0.SaveChangesAsync();

                r.result = true;
                r.id = md.editor_detail_id;
                return Ok(r);
                #endregion
            }
            catch (DbEntityValidationException ex) //欄位驗證錯誤
            {
                r.message = getDbEntityValidationException(ex);
                r.result = false;
                return Ok(r);
            }
            catch (Exception ex)
            {
                r.result = false;
                r.message = ex.Message + "\r\n" + getErrorMessage(ex);
                return Ok(r);
            }
            finally
            {
                db0.Dispose();
            }
        }
        public async Task<IHttpActionResult> Delete([FromBody]delParam param)
        {
            try
            {
                db0 = getDB0();
                r = new ResultInfo<EditorDetail>();

                item = await db0.EditorDetail.FindAsync(param.id);
                if (item != null)
                {
                    db0.EditorDetail.Remove(item);
                    await db0.SaveChangesAsync();
                    r.result = true;
                    return Ok(r);
                }
                else
                {
                    r.result = false;
                    r.message = Resources.Res.Log_Err_Delete_NotFind;
                    return Ok(r);
                }

            }
            catch (DbUpdateException ex)
            {
                r.result = false;
                if (ex.InnerException != null)
                {
                    r.message = Resources.Res.Log_Err_Delete_DetailExist + "\r\n" + getErrorMessage(ex);
                }
                else
                {
                    r.message = ex.Message;
                }
                return Ok(r);
            }
            catch (Exception ex)
            {
                r.result = false;
                r.message = ex.Message;
                return Ok(r);
            }
            finally
            {
                db0.Dispose();
            }
        }

        [Route("GetDetailList")]
        public async Task<IHttpActionResult> GetDetailList([FromUri]int main_id)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = db0.EditorDetail
                    .Where(x => x.editor_id == main_id)
                    .OrderByDescending(x => new { main_sort = x.Editor.sort, x.sort, x.editor_detail_id })
                    .Select(x => new 
                    {
                        editor_id = x.editor_id,
                        editor_detail_id = x.editor_detail_id,
                        detail_name = x.detail_name,
                        detail_content = x.detail_content,
                        sort = x.sort,
                        i_Hide = x.i_Hide,
                        edit_state = EditState.Update
                    });

                return Ok(await items.ToListAsync());
            }

            #endregion
        }

        public class queryParam : QueryBase
        {
            public string keyword { set; get; }

        }
        public class putBodyParam
        {
            public int id { get; set; }
            public EditorDetail md { get; set; }
        }
        public class delParam
        {
            public int id { get; set; }
        }
    }


}
