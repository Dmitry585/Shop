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

namespace View.Controllers.Shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationContext _context;
        // тестовые данные вместо использования базы данных
        public ProductController(ApplicationContext context)
        {
            this._context = context;
        }
        // GET: api/Product
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            var pr = new ProductRepository(_context);
            var result = pr.GetAllProducts();
            return result;
        }

        // POST: api/Product
        [HttpPost]
        public async Task<Product> Post([FromForm] Product product)
        {
            var prm = new ProductModification(_context);
            var result = await prm.CreateProduct(product);
            return result;
        }

        // PUT: api/Product/5
        [HttpPut("{id}")]
        public async Task<Product> Put(int id, [FromForm] Product product)
        {
            var prm = new ProductModification(_context);
            var result = await prm.EditProduct(id,product);
            return result;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var pr = new ProductRepository(_context);
            var product = pr.GetProductById(id);
            var prm = new ProductModification(_context);
            prm.DeleteProduct(product);
        }
    }
}
