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
    [RoutePrefix("api/Reserve")]
    public class ReserveController : ajaxApi<Reserve>
    {
        public async Task<IHttpActionResult> Get([FromUri] int id)
        {
            using (db0 = getDB0())
            {
                Reserve item = await db0.Reserve.FindAsync(id);
                item.resident_no = item.Resident.resident_no;
                item.facility_name = item.Facility.name;
                var r = new ResultInfo<Reserve>() { data = item };
                return Ok(r);
            }
        }
        public async Task<IHttpActionResult> Get([FromUri]queryParam q)
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            db0 = getDB0();
            var predicate = PredicateBuilder.True<Reserve>();

            if (q.keyword != null)
                predicate = predicate.And(x => x.name.Contains(q.keyword));

            if (q.facility_id != null)
                predicate = predicate.And(x => x.facility_id == q.facility_id);

            int page = (q.page == null ? 1 : (int)q.page);
            var result = db0.Reserve.AsExpandable().Where(predicate);
            var resultCount = await result.CountAsync();

            int startRecord = PageCount.PageInfo(page, defPageSize, resultCount);
            var resultItems = await result
                .OrderByDescending(x => x.i_InsertDatetime)
                .Skip(startRecord)
                .Take(defPageSize)
                .Select(x => new
                {
                    x.facility_id,
                    x.reserve_id,
                    x.resident_id,
                    facility_name = x.Facility.name,
                    x.day,
                    x.s_time,
                    x.e_time,
                    x.person,
                    resident_no = x.Resident.resident_no,
                    x.name,
                    x.state
                })
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

                item = await db0.Reserve.FindAsync(param.id);
                var md = param.md;
                item.state = md.state;
                item.fail_info = md.fail_info;

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
        public async Task<IHttpActionResult> Post([FromBody]Reserve md)
        {
            md.facility_id = GetNewId(CodeTable.Reserve);

            r = new ResultInfo<Reserve>();
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

                db0.Reserve.Add(md);
                await db0.SaveChangesAsync();

                r.result = true;
                r.id = md.facility_id;
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
                r = new ResultInfo<Reserve>();

                item = await db0.Reserve.FindAsync(param.id);
                if (item != null)
                {
                    db0.Reserve.Remove(item);
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
        [Route("GetTypeList")]
        public async Task<IHttpActionResult> GetTypeList()
        {
            #region 連接BusinessLogicLibary資料庫並取得資料

            using (db0 = getDB0())
            {
                var items = db0.Facility
                    .OrderByDescending(x => x.sort)
                    .Select(x => new
                    {
                        id = x.facility_id,
                        label = x.name
                    });

                return Ok(await items.ToListAsync());
            }

            #endregion
        }
        public class queryParam : QueryBase
        {
            public string keyword { set; get; }
            public int? facility_id { get; set; }
        }
        public class putBodyParam
        {
            public int id { get; set; }
            public Reserve md { get; set; }
        }
        public class delParam
        {
            public int id { get; set; }
        }
    }


}
