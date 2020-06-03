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
    public class RezervationController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public RezervationController(ApplicationContext context)
        {
            this._context = context;
        }
        // GET: api/Rezervation
        [HttpGet]
        public IEnumerable<Model.Models.Rezervation> Get()
        {
            var rr = new RezervationRepository(_context);
            return rr.GetTodayRezervation();
        }

        // GET: api/Rezervation/5
        [HttpGet("{id}", Name = "GetRezervation")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Rezervation
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Rezervation/5
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
