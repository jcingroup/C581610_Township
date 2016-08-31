using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0
{
    [MetadataType(typeof(ReserveMetadata))]
    public partial class Reserve
    {
        private class ReserveMetadata
        {
            [JsonIgnore()]
            public virtual Facility Facility { get; set; }
            [JsonIgnore()]
            public virtual Resident Resident { get; set; }
        }
    }
}

