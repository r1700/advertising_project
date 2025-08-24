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
    public class Realization
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int Points { get; set; }
        public int UserId { get; set; }
        public int PurchaseId { get; set; }
        public string? Img { get; set; }
        public string? Notes { get; set; }
       // public int ProductId { get; set; }
      
       // [IgnoreDataMember]
       // [JsonIgnore]
       // public virtual Products? Product { get; set; }

        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Users? User { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual Purchase? Purchase { get; set; }




    }
}
