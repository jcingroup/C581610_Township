using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0
{
    [MetadataType(typeof(ResidentMetadata))]
    public partial class Resident
    {
        private class ResidentMetadata
        {
            //[JsonIgnore()]
            //public virtual ICollection<Matter> Matter { get; set; }
            //[JsonIgnore()]
            //public virtual ICollection<Community_News> Community_News { get; set; }
            //[JsonIgnore()]
            //public virtual ICollection<Community_Banner> Community_Banner { get; set; }
        }
    }
}

