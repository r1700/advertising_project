using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace DAL
{
    public class Products
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int Points { get; set; }

       // [IgnoreDataMember]
       // [JsonIgnore]
       //public virtual List<Realization>? RealizationList { get; set; }

        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchase>? Purchase { get; set; }

    }
}
