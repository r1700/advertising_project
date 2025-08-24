using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class RealizationRepository: IRepository<Realization>, IRepositoryByUser<Realization>
    {

        private AdvertisingDb advertising;


        public RealizationRepository(AdvertisingDb advertising)
        {
            this.advertising = advertising;

        }


        public Realization Add(Realization entity)
        {
            advertising.Realizations.Add(entity);
            advertising.SaveChanges();
            return entity;
        }

        public void Delete(Realization entity)
        {
            advertising.Realizations.Remove(entity);
            advertising.SaveChanges();
        }

        public Realization GetById(int id)
        {
            return advertising.Realizations.Find(id);
        }
        public List<Realization> GetAll()
        {
            return advertising.Realizations.ToList();
        }

        public Realization Update(Realization entity)
        {
            advertising.Realizations.Update(entity);
            advertising.SaveChanges();
            return entity;
        }

        public List<Realization> GetByUser(Users p)
        {
            return advertising.Realizations.Where(u => u.UserId == p.Id).ToList();
        }
    }
}
