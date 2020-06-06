using EntityDatabase.Data.Repositories;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Modifications
{
    public class RezervationModification : BaseModification<Rezervation>
    {
        public RezervationModification(ApplicationContext _context) : base(_context) { }

        public async Task<Rezervation> CreateRezervation(Rezervation rezervation)
        {
            try
            {
                if (rezervation.TableId == 0) rezervation.TableId = null;
                var res =    await _context.Rezervations.AddAsync(rezervation);
                _context.SaveChanges();
                var pm = new ProductModification(_context);
                var pr = new ProductRepository(_context);
                var products = pr.GetAllProducts();
                foreach (var item in rezervation.Items)
                {
                    var product = products.Where(x=>x.ProductId==item.ProductId).FirstOrDefault();
                    product.Count -= item.Count;
                    _ = await pm.EditProduct(item.ProductId, product);
                }
                _context.SaveChanges();
                return rezervation;
            }
            catch (Exception e){
                Console.WriteLine(e.Message);
            }
            return null;
        }
    }
}
