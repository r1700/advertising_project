using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class SubScriptionsRepository: IRepository<SubScriptions>
    {

        private AdvertisingDb advertising;

        public SubScriptionsRepository(AdvertisingDb advertising)
        {
            this.advertising = advertising;
        }


        public SubScriptions Add(SubScriptions entity)
        {
            advertising.SubScriptions.Add(entity);
            advertising.SaveChanges();
            return entity;
        }

        public void Delete(SubScriptions entity)
        {
            advertising.SubScriptions.Remove(entity);
            advertising.SaveChanges();
        }

        public SubScriptions GetById(int id)
        {
            return advertising.SubScriptions.Find(id);
        }
        public List<SubScriptions> GetAll()
        {
            return advertising.SubScriptions.ToList();
        }

        public SubScriptions Update(SubScriptions entity)
        {
            advertising.SubScriptions.Update(entity);
            advertising.SaveChanges();
            return entity;
        }

    }
}
