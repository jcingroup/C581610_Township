﻿//------------------------------------------------------------------------------
// <auto-generated>
//     這個程式碼是由範本產生。
//
//     對這個檔案進行手動變更可能導致您的應用程式產生未預期的行為。
//     如果重新產生程式碼，將會覆寫對這個檔案的手動變更。
// </auto-generated>
//------------------------------------------------------------------------------

namespace ProcCore.Business.DB0
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class C58A0_TownshipEntities : DbContext
    {
        public C58A0_TownshipEntities()
            : base("name=C58A0_TownshipEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<AspNetRoles> AspNetRoles { get; set; }
        public virtual DbSet<AspNetUsers> AspNetUsers { get; set; }
        public virtual DbSet<Department> Department { get; set; }
        public virtual DbSet<i_Currency> i_Currency { get; set; }
        public virtual DbSet<i_IDX> i_IDX { get; set; }
        public virtual DbSet<i_Lang> i_Lang { get; set; }
        public virtual DbSet<i_Parm> i_Parm { get; set; }
        public virtual DbSet<i_SN> i_SN { get; set; }
        public virtual DbSet<Menu> Menu { get; set; }
        public virtual DbSet<News> News { get; set; }
        public virtual DbSet<Editor_L1> Editor_L1 { get; set; }
        public virtual DbSet<Editor_L2> Editor_L2 { get; set; }
        public virtual DbSet<Editor_L3> Editor_L3 { get; set; }
        public virtual DbSet<MsgBoard> MsgBoard { get; set; }
        public virtual DbSet<MsgType> MsgType { get; set; }
        public virtual DbSet<Resident> Resident { get; set; }
        public virtual DbSet<Reserve> Reserve { get; set; }
        public virtual DbSet<Facility> Facility { get; set; }
    }
}
