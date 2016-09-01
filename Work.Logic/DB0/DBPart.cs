using System;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Validation;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using System.Reflection;

namespace ProcCore.Business.DB0
{
    public enum EditState
    {
        None = 0,
        Insert = 1,
        Update = 2,
        View = 3
    }
    public enum InputViewMode
    {
        view = 0,
        edit = 1
    }
    public enum VisitDetailState
    {
        none,
        wait,
        progress,
        finish,
        pause
    }
    public enum EditorState
    {
        AboutUs = 1,//社區介紹
        Assets = 2,//資產管理
        Efficacy = 3,//效能管理
        Group = 4,//組織管理
        Management = 5,//維運管理
        Fix = 6//長期修繕
    }
    public enum MsgState
    {
        no = 0,//未處理
        SuccessAndShow = 1,//處理完成並顯示於前台
        SuccessAndHide = 2 //處理完成但不顯示
    }
    public enum ReserveState
    {
        Fail = -1,//預約失敗
        no = 0,//未處理
        Success = 1,//預約成功
    }
    #region set CodeSheet

    public static class CodeSheet
    {
        public static List<i_Code> news_type = new List<i_Code>()
        {
            new i_Code{ Code = 1, Value = "活動", ClassName = "activity",IconClass="label-success" },
            new i_Code{ Code = 2, Value = "公告", ClassName = "public",IconClass="label-danger"  },
            new i_Code{ Code = 3, Value = "資訊", ClassName = "info" ,IconClass="label-info" }
        };
        public static List<i_Code> msg_state = new List<i_Code>()
        {
            new i_Code{ Code = 0, Value = "管理員已收到用戶留言，將盡快為您回覆", ClassName = "activity",IconClass="label-success" },
            new i_Code{ Code = 1, Value = "已處理完成", ClassName = "public",IconClass="label-danger"  },
            new i_Code{ Code = 2, Value = "已處理完成", ClassName = "info" ,IconClass="label-info" }
        };
        public static List<i_Code> reserve_state = new List<i_Code>()
        {
            new i_Code{ Code = -1, Value = "預約成功", ClassName = "activity",IconClass="label-danger" },
            new i_Code{ Code = 0, Value = "待審核", ClassName = "public",IconClass="label-warning"  },
            new i_Code{ Code = 1, Value = "預約失敗", ClassName = "info" ,IconClass="label-success" }
        };

        public static string GetStateVal(int code, i_CodeName propName, List<i_Code> data)
        {
            string Val = string.Empty;
            string name = Enum.GetName(typeof(i_CodeName), propName);
            foreach (var item in data)
            {
                if (item.Code == code)
                    Val = GetPropValue(item, name).ToString();
            }
            return Val;
        }
        public static Object GetPropValue(this Object obj, String name)
        {
            foreach (String part in name.Split('.'))
            {
                if (obj == null) { return null; }

                Type type = obj.GetType();
                PropertyInfo info = type.GetProperty(part);
                if (info == null) { return null; }

                obj = info.GetValue(obj, null);
            }
            return obj;
        }
    }

    public enum i_CodeName
    {
        Code,
        ClassName,
        IconClass,
        Value
    }
    public class i_Code
    {
        public int? Code { get; set; }
        public string ClassName { get; set; }
        public string IconClass { get; set; }
        public string Value { get; set; }
    }
    #endregion
    public class m_News
    {
        public int news_id { get; set; }
        public string news_title { get; set; }
        public System.DateTime day { get; set; }
        public int news_type { get; set; }
        public string news_content { get; set; }
        public DateTime? i_UpdateDateTime { get; set; }
    }
    public class option
    {
        public int val { get; set; }
        public string Lname { get; set; }
    }
    public partial class Menu
    {
        public IList<MenuRoleArray> role_array { get; set; }
    }
    public class MenuRoleArray
    {
        public string role_id { get; set; }
        public bool role_use { get; set; }
        public string role_name { get; set; }
    }
    public partial class C58A0_TownshipEntities : DbContext
    {
        public C58A0_TownshipEntities(string connectionstring)
            : base(connectionstring)
        {
        }

        public override Task<int> SaveChangesAsync()
        {
            return base.SaveChangesAsync();
        }
        public override int SaveChanges()
        {
            try
            {
                return base.SaveChanges();
            }
            catch (DbEntityValidationException ex)
            {
                Log.Write(ex.Message, ex.StackTrace);
                foreach (var err_Items in ex.EntityValidationErrors)
                {
                    foreach (var err_Item in err_Items.ValidationErrors)
                    {
                        Log.Write("欄位驗證錯誤", err_Item.PropertyName, err_Item.ErrorMessage);
                    }
                }

                throw ex;
            }
            catch (DbUpdateException ex)
            {
                Log.Write("DbUpdateException", ex.InnerException.Message);
                throw ex;
            }
            catch (EntityException ex)
            {
                Log.Write("EntityException", ex.Message);
                throw ex;
            }
            catch (UpdateException ex)
            {
                Log.Write("UpdateException", ex.Message);
                throw ex;
            }
            catch (Exception ex)
            {
                Log.Write("Exception", ex.Message);
                throw ex;
            }
        }

    }

}
