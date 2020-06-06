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
using Rezervat = Model.Models.Rezervation;

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
        public IEnumerable<Rezervat> Get()
        {
            var rr = new RezervationRepository(_context);
            return rr.GetRezervation();
        }

        // POST: api/Rezervation
        [HttpPost]
        public async Task<bool> Post([FromBody] Rezervat rezervation)
        {
            var rm = new RezervationModification(_context);
            _ =await rm.CreateRezervation(rezervation);
            return true;
        }
    }
}
