using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public class ProductRepository : IRepository<Products>
    {

        private AdvertisingDb advertising;

        public ProductRepository(AdvertisingDb advertising)
        {
            this.advertising = advertising;
        }


        public Products Add(Products entity)
        {
            advertising.Products.Add(entity);
            advertising.SaveChanges();
            return entity;
        }

        public void Delete(Products entity)
        {
            advertising.Products.Remove(entity);
            advertising.SaveChanges();
        }

        public Products GetById(int id)
        {
            return advertising.Products.Find(id);
        }
        public List<Products >GetAll()
        {
            return advertising.Products.ToList();
        }

        public Products Update(Products entity)
        {
            advertising.Products.Update(entity);
            advertising.SaveChanges();
            return entity;
        }

    }
}
