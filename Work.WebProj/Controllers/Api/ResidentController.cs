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
    [RoutePrefix("api/Resident")]
    public class ResidentController : ajaxApi<Resident>
    {
        public async Task<IHttpActionResult> Get([FromUri] int id)
        {
            using (db0 = getDB0())
            {
                Resident item = await db0.Resident.FindAsync(id);
                var r = new ResultInfo<Resident>() { data = item };
                return Ok(r);
            }
        }
        public async Task<IHttpActionResult> Get([FromUri]queryParam q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            db0 = getDB0();
            var predicate = PredicateBuilder.True<Resident>();

            if (q.keyword != null)
                predicate = predicate.And(x => x.resident_name.Contains(q.keyword));

            int page = (q.page == null ? 1 : (int)q.page);
            var result = db0.Resident.AsExpandable().Where(predicate);
            var resultCount = await result.CountAsync();

            int startRecord = PageCount.PageInfo(page, defPageSize, resultCount);
            var resultItems = await result
                .OrderBy(x => x.resident_id)
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

                item = await db0.Resident.FindAsync(param.id);
                var md = param.md;
                item.resident_name = md.resident_name;
                item.resident_no = md.resident_no;
                item.account = md.account;
                item.passwd = md.passwd;
                item.email = md.email;
              

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
        public async Task<IHttpActionResult> Post([FromBody]Resident md)
        {
            md.resident_id = GetNewId(CodeTable.Resident);

            //md.i_InsertDateTime = DateTime.Now;
            //md.i_InsertDeptID = departmentId;
            //md.i_InsertUserID = UserId;
            //md.i_Lang = "zh-TW";
            r = new ResultInfo<Resident>();
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

                bool check_account = db0.Resident.Any(x=>x.account==md.account);
                if (check_account) {
                    r.message = Resources.Res.Log_Err_AccountExists;
                    r.result = false;
                    return Ok(r);
                }

                db0.Resident.Add(md);
                await db0.SaveChangesAsync();

                r.result = true;
                r.id = md.resident_id;
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
                r = new ResultInfo<Resident>();

                item = await db0.Resident.FindAsync(param.id);
                if (item != null)
                {
                    db0.Resident.Remove(item);
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
            public Resident md { get; set; }
        }
        public class delParam
        {
            public int id { get; set; }
        }
    }


}
