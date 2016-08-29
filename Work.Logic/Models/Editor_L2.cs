using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0 {
    [MetadataType(typeof(Editor_L2Metadata))]
    public partial class Editor_L2
    {
        public EditState edit_state { get; set; }
        private class Editor_L2Metadata
        {
            [JsonIgnore()]
            public Editor_L1 Editor_L1 { get; set; }
            [JsonIgnore()]
            public ICollection<Editor_L3> Editor_L3 { get; set; }
        }
    }
}

