using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0
{
    [MetadataType(typeof(NewsMetadata))]
    public partial class News
    {
        private class NewsMetadata
        {
        }
    }
}

