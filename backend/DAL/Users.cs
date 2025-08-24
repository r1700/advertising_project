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
    public class Users
    {
        [Key]
        public int? Id { get; set; }
        public int? Tz { get; set; }
        public string Password { get; set; }
        public string? Name { get; set; }
        public string Email { get; set; }
        public int? Phone { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Purchase>? purchases { get; set; }
        [IgnoreDataMember]
        [JsonIgnore]
        public virtual List<Realization>? realizations { get; set; }

       // public string Role { get; set; }//תפקיד של המשתמש

    }
}
