using Microsoft.EntityFrameworkCore;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;

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
    }
}
