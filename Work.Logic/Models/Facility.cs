using Newtonsoft.Json;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace ProcCore.Business.DB0
{
    [MetadataType(typeof(FacilityMetadata))]
    public partial class Facility
    {
        public string img_src { get; set; }
        private class FacilityMetadata
        {

        }
    }
}

