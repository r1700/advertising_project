using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DAL;
using System.Threading.Tasks;

namespace BLL
{
    public interface IRepositoryPurchase
    {
        List<Purchase> GetActivePurchase();
        List<Purchase> GetByUser(Users u);
    }
}
