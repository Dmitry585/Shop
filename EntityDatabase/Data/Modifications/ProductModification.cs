using EntityDatabase.Data.Repositories;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Modifications
{
    public class ProductModification : BaseModification<Product>
    {
        public ProductModification(ApplicationContext _context) : base(_context) { }

        public async Task<Product> CreateProduct(Product product)
        {
            try
            {
                StartCondition().Add(product);
                var result = await _context.SaveChangesAsync();
                return product;
            }
            catch { }
            return null;
        }

        public async Task<Product> EditProduct(int id, Product newproduct)
        {
            try
            {
                ProductRepository pr = new ProductRepository(_context);
                Product product = pr.GetProductById(id);
                if (product != null)
                {
                    product.About = newproduct.About;
                    product.Count = newproduct.Count;
                    product.Image = newproduct.Image;
                    product.Name = newproduct.Name;
                    product.Price = newproduct.Price;
                    product.ProductTypeId = newproduct.ProductTypeId;
                    await _context.SaveChangesAsync();
                    return product;
                }
            }
            catch { }
            return null;
        }

        public bool DeleteProduct(Product product)
        {
            try
            {
                _context.Products.Remove(product);
                _ = _context.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                System.Console.WriteLine(e.Message);
            }
            return false;
        }
    }
}
