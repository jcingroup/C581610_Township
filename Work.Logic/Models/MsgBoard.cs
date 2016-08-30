using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0
{
    [MetadataType(typeof(MsgBoardMetadata))]
    public partial class MsgBoard
    {
        public string resident_no { get; set; }
        private class MsgBoardMetadata
        {
            [JsonIgnore()]
            public virtual Resident Resident { get; set; }
            [JsonIgnore()]
            public virtual MsgType MsgType { get; set; }
        }
    }
}

