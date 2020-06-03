using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntityDatabase.Data;
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

        // GET: api/Tables/5
        [HttpGet("{id}", Name = "GetTables")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Tables
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Tables/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
