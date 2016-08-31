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
            [JsonIgnore()]
            public virtual ICollection<MsgBoard> MsgBoard { get; set; }
            [JsonIgnore()]
            public virtual ICollection<Reserve> Reserve { get; set; }
        }
    }
}

