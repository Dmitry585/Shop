using EntityDatabase.Data.Repositories;
using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Modifications
{
    public class TableModification : BaseModification<Table>
    {
        public TableModification(ApplicationContext _context) : base(_context) { }

        public async Task<Table> CreateTable(Table table)
        {
            try
            {
                _context.Tables.Add(table);
                var result = await _context.SaveChangesAsync();
                return table;
            }
            catch { }
            return null;
        }

        public async Task<Table> EditTable(int id, Table newTable)
        {
            try
            {
                TableRepository tr = new TableRepository(_context);
                Table table = tr.GetTableById(id);
                if (table != null)
                {
                    table.MaxPerson = newTable.MaxPerson;
                    await _context.SaveChangesAsync();
                    return table;
                }
            }
            catch { }
            return null;
        }

        public bool DeleteTable(Table Table)
        {
            try
            {
                _context.Tables.Remove(Table);
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
