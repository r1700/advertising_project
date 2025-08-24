using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DAL
{
    public class AdvertisingDb:DbContext
    {
        public AdvertisingDb(DbContextOptions<AdvertisingDb> options):base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<Purchase> Purchases{ get; set; }
        public DbSet<Realization> Realizations { get; set; }
        public DbSet<SubScriptions> SubScriptions { get; set; }

    }
}
