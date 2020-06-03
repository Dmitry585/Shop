﻿using Microsoft.EntityFrameworkCore;
using Model.Models;
using System.Collections.Generic;
using System.Linq;

namespace EntityDatabase.Data.Repositories
{
    public class TableRepository : BaseRepository<Table>
    {
        public TableRepository(ApplicationContext _context) : base(_context){}

        public List<Table> GetTables()
        {
            var result = base.StartCondition().ToList();
            return result;
        }
    }
}