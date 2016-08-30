using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0
{
    [MetadataType(typeof(MsgTypeMetadata))]
    public partial class MsgType
    {
        private class MsgTypeMetadata
        {
            [JsonIgnore()]
            public virtual ICollection<MsgBoard> MsgBoard { get; set; }
        }
    }
}

