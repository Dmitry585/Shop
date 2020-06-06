using Microsoft.EntityFrameworkCore;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Z.EntityFramework.Plus;

namespace EntityDatabase.Data.Repositories
{
    public class ProductTypeRepository : BaseRepository<ProductType>
    {
        public ProductTypeRepository(ApplicationContext _context) : base(_context) { }

        public object GetAllProductTypes()
        {
            var result = StartCondition().Select(x=>new { 
                x.Name,
                x.ProductTypeId,
                Selected = false
            }).ToList();
            return result;
        }

        public ProductType GetProductTypeById(int id)
        {
            var result = base.StartCondition().FirstOrDefault(x => x.ProductTypeId == id);
            return result;
        }
    }
}
