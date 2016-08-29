using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0 {
    [MetadataType(typeof(Editor_L3Metadata))]
    public partial class Editor_L3
    {
        public EditState edit_state { get; set; }
        private class Editor_L3Metadata
        {
            [JsonIgnore()]
            public Editor_L1 Editor_L1 { get; set; }
            [JsonIgnore()]
            public Editor_L2 Editor_L2 { get; set; }
        }
    }
}

