using EntityDatabase.Data.Repositories;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Modifications
{
    public class ProductTypeModification : BaseModification<ProductType>
    {
        public ProductTypeModification(ApplicationContext _context) : base(_context) { }

        public async Task<ProductType> CreateProductType(ProductType productType)
        {
            try
            {
                StartCondition().Add(productType);
                var result = await _context.SaveChangesAsync();
                return productType;
            }
            catch { }
            return null;
        }

        public async Task<ProductType> EditProductType(int id, ProductType newProductType)
        {
            try
            {
                ProductTypeRepository pr = new ProductTypeRepository(_context);
                ProductType productType = pr.GetProductTypeById(id);
                if (productType != null)
                {
                    productType.Name = newProductType.Name;
                    await _context.SaveChangesAsync();
                    return productType;
                }
            }
            catch { }
            return null;
        }

        public bool DeleteProductType(ProductType productType)
        {
            try
            {
                _context.ProductTypes.Remove(productType);
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
