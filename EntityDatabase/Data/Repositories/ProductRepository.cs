using Microsoft.EntityFrameworkCore;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Repositories
{
    public class ProductRepository : BaseRepository<Product>
    {
        public ProductRepository(ApplicationContext _context) : base(_context) { }

        public List<Product> GetAllProducts()
        {
            var result = StartCondition().Include(product => product.Type).OrderByDescending(x=>x.Count).ToList();
            return result;
        }

        public List<Product> GetAllProductsXlsx()
        {
            var result = StartCondition().Include(product => product.Type).ToList();
            return result;
        }

        public Product GetProductById(int id)
        {
            var result = base.StartCondition().FirstOrDefault(x => x.ProductId == id);
            return result;
        }
    }
}
