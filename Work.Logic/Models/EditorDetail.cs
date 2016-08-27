using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0 {
    [MetadataType(typeof(EditorDetailMetadata))]
    public partial class EditorDetail
    {
        public EditState edit_state { get; set; }
        private class EditorDetailMetadata
        {
            [JsonIgnore()]
            public Editor Editor { get; set; }
        }
    }
}

