//------------------------------------------------------------------------------
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
    using System.Collections.Generic;
    
    public partial class Facility
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Facility()
        {
            this.Reserve = new HashSet<Reserve>();
        }
    
        public int facility_id { get; set; }
        public string name { get; set; }
        public string info { get; set; }
        public string role_content { get; set; }
        public System.DateTime s_date { get; set; }
        public System.DateTime e_date { get; set; }
        public string weeks { get; set; }
        public bool same { get; set; }
        public int sort { get; set; }
        public bool i_Hide { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Reserve> Reserve { get; set; }
    }
}
