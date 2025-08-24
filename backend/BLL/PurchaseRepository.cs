using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class PurchaseRepository : IRepository<Purchase>, IRepositoryByUser<Purchase>
    {
        private AdvertisingDb advertising;

        public PurchaseRepository(AdvertisingDb advertising)
        {
            this.advertising = advertising;
        }


        public Purchase Add(Purchase entity)
        {
            advertising.Purchases.Add(entity);
            advertising.SaveChanges();
            return entity;
        }

        public void Delete(Purchase entity)
        {
            advertising.Purchases.Remove(entity);
            advertising.SaveChanges();
        }

        public Purchase GetById(int id)
        {
            return advertising.Purchases.Find(id);
        }
        public List<Purchase> GetAll()
        {
            return advertising.Purchases.ToList();
        }
        public List<Purchase> GetActivePurchase()
        {
            return advertising.Purchases.Where(p=>p.PointsBalance>0).ToList();
        }

        public Purchase Update(Purchase entity)
        {
            advertising.Purchases.Update(entity);
            advertising.SaveChanges();
            return entity;
        }
        public List< Purchase> GetByUser(Users p)
        {
            return advertising.Purchases.Where(u => u.UserId == p.Id ).ToList();
        }

     
    }
}
