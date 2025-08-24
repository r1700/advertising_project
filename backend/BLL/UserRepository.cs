using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using DAL;

using BCrypt.Net;


namespace BLL
{
    public class UserRepository : IRepository<Users> ,IRepositoryUser<Users>
    {
        private AdvertisingDb advertising;


        public UserRepository(AdvertisingDb advertising)
        {
            this.advertising = advertising;

        }


        public Users Add(Users entity)
        {
            advertising.Users.Add(entity);
            advertising.SaveChanges();
            return entity;
        }

        public void Delete(Users entity)
        {
            advertising.Users.Remove(entity);
            advertising.SaveChanges();
        }

        public Users GetById(int id)
        {
            return advertising.Users.Find(id);
        }
        public List<Users> GetAll()
        {
            return advertising.Users.ToList();
        }

        public Users Update(Users entity)
        {
            advertising.Users.Update(entity);
            advertising.SaveChanges();
            return entity;
        }

       

        public Users GetByEmailAndPassword(string e, string p)
        {

          //  return advertising.Users.FirstOrDefault(u => u.Email == e && BCrypt.Net.BCrypt.Verify(u.Password, p));
            return advertising.Users.FirstOrDefault(u => u.Email == e && u.Password== p);
        }

      
    }
}
