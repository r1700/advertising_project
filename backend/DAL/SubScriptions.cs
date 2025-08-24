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
    public class SubScriptions
    {
        [Key]
        public int Id { get; set; }
        public int AmountPoints { get; set; }
        public int Price { get; set; }
        public string Description { get; set; }


        [IgnoreDataMember]

        [JsonIgnore]
        public virtual List<Purchase>? Purchases { get; set; }

    }
}
