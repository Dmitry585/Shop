using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntityDatabase.Data;
using EntityDatabase.Data.Modifications;
using EntityDatabase.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;

namespace View.Controllers.Rezervation
{
    [Route("api/[controller]")]
    [ApiController]
    public class TablesController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public TablesController(ApplicationContext context)
        {
            this._context = context;
        }
        // GET: api/Tables
        [HttpGet]
        public IEnumerable<Table> Get()
        {
            var tr = new TableRepository(_context);
            return tr.GetTables();
        }


        // POST: api/Tables
        [HttpPost]
        public async Task<Table> Post([FromForm] Table table)
        {
            var tm = new TableModification(_context);
            var result = await tm.CreateTable(table);
            return result;
        }

        // PUT: api/Tables/5
        [HttpPut("{id}")]
        public async Task<Table> Put(int id, [FromForm] Table table)
        {
            var tm = new TableModification(_context);
            var result = await tm.EditTable(id, table);
            return result;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var tr = new TableRepository(_context);
            var table = tr.GetTableById(id);
            var tm = new TableModification(_context);
            tm.DeleteTable(table);
        }
    }
}
