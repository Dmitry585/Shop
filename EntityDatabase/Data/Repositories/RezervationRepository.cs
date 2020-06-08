using Microsoft.EntityFrameworkCore;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace EntityDatabase.Data.Repositories
{
    public class RezervationRepository : BaseRepository<Rezervation>
    {
        public RezervationRepository(ApplicationContext _context) : base(_context){}

        public List<Rezervation> GetTodayRezervation()
        {
            var result = base.StartCondition().Where(x=>x.RezervationDate.Date == DateTime.Now.Date).ToList();
            return result;
        }

        public List<Rezervation> GetRezervation()
        {
            var result = base.StartCondition().Include(x=>x.Table).ToList();
            var pr = new ProductRepository(_context);
            var products = pr.GetAllProducts();
            foreach(var res in result)
            {
                foreach(var item in res.Items)
                {
                    var buffer = products.Where(x => x.ProductId == item.ProductId).FirstOrDefault();
                    if (buffer == null) continue;
                    item.Product = buffer;
                }
            }
            return result;
        }


    }
}
