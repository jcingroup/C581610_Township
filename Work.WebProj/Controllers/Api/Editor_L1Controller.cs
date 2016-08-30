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
    [RoutePrefix("api/Editor_L1")]
    public class Editor_L1Controller : ajaxApi<Editor_L1>
    {
        public async Task<IHttpActionResult> Get([FromUri] int id)
        {
            using (db0 = getDB0())
            {
                Editor_L1 item = await db0.Editor_L1.FindAsync(id);
                var r = new ResultInfo<Editor_L1>() { data = item };
                return Ok(r);
            }
        }
        public async Task<IHttpActionResult> Get([FromUri]queryParam q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            db0 = getDB0();
            var predicate = PredicateBuilder.True<Editor_L1>();

            if (q.keyword != null)
                predicate = predicate.And(x => x.name.Contains(q.keyword));

            int page = (q.page == null ? 1 : (int)q.page);
            var result = db0.Editor_L1.AsExpandable().Where(predicate);
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



                item = await db0.Editor_L1.FindAsync(param.id);
                var md = param.md;

                var details = item.Editor_L2;

                foreach (var detail in details)
                {
                    var md_detail = md.Editor_L2.First(x => x.editor_l2_id == detail.editor_l2_id);
                    if (detail.sort != md_detail.sort ||
                        detail.l2_name != md_detail.l2_name ||
                        detail.l2_content != md_detail.l2_content ||
                        detail.i_Hide != md_detail.i_Hide)
                    {
                        detail.i_UpdateUserID = UserId;
                        detail.i_UpdateDateTime = DateTime.Now;
                        detail.i_UpdateDeptID = departmentId;
                    }
                    detail.sort = md_detail.sort;
                    detail.l2_name = md_detail.l2_name;
                    detail.l2_content = RemoveScriptTag(md_detail.l2_content);
                    detail.i_Hide = md_detail.i_Hide;
                }

                var add_detail = md.Editor_L2.Where(x => x.edit_state == EditState.Insert);
                foreach (var detail in add_detail)
                {
                    detail.editor_l2_id = GetNewId(CodeTable.Editor_L2);
                    detail.l2_content = RemoveScriptTag(detail.l2_content);
                    detail.i_InsertUserID = UserId;
                    detail.i_InsertDateTime = DateTime.Now;
                    detail.i_InsertDeptID = departmentId;
                    detail.i_UpdateUserID = UserId;
                    detail.i_UpdateDateTime = DateTime.Now;
                    detail.i_UpdateDeptID = departmentId;
                    detail.i_Lang = "zh-TW";
                    details.Add(detail);
                }

                item.body_class = md.body_class;
                item.url = md.url;
                item.name = md.name;
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
        public async Task<IHttpActionResult> Post([FromBody]Editor_L1 md)
        {
            md.editor_l1_id = GetNewId(CodeTable.Editor_L1);

            md.i_InsertDateTime = DateTime.Now;
            md.i_InsertDeptID = departmentId;
            md.i_InsertUserID = UserId;
            md.i_UpdateDateTime = DateTime.Now;
            md.i_UpdateDeptID = departmentId;
            md.i_UpdateUserID = UserId;
            md.i_Lang = "zh-TW";
            r = new ResultInfo<Editor_L1>();
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

                db0.Editor_L1.Add(md);
                await db0.SaveChangesAsync();

                r.result = true;
                r.id = md.editor_l1_id;
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
                r = new ResultInfo<Editor_L1>();

                item = await db0.Editor_L1.FindAsync(param.id);
                if (item != null)
                {
                    db0.Editor_L1.Remove(item);
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
        public class queryParam : QueryBase
        {
            public string keyword { set; get; }

        }
        public class putBodyParam
        {
            public int id { get; set; }
            public Editor_L1 md { get; set; }
        }
        public class delParam
        {
            public int id { get; set; }
        }
    }


}
