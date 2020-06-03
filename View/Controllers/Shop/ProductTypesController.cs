using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntityDatabase.Data;
using EntityDatabase.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;

namespace View.Controllers.Shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTypesController : ControllerBase
    {
        private readonly ApplicationContext _context;
        // тестовые данные вместо использования базы данных
        public ProductTypesController(ApplicationContext context)
        {
            this._context = context;
        }
        // GET: api/ProductTypes
        [HttpGet]
        public object Get()
        {
            var ptr = new ProductTypeRepository(_context);
            return ptr.GetAllProductTypes();
        }

        // GET: api/ProductTypes/5
        [HttpGet("{id}", Name = "GetProductType")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/ProductTypes
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/ProductTypes/5
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
