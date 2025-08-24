﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
namespace BLL
{
    public interface IRepositoryByUser<T>
    {
        List<T> GetByUser(Users u);
    }
}
