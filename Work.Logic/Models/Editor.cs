using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0 {
    [MetadataType(typeof(EditorMetadata))]
    public partial class Editor
    {
        private class EditorMetadata
        {
            [JsonIgnore()]
            public ICollection<EditorDetail> EditorDetail { get; set; }
        }
    }
}

