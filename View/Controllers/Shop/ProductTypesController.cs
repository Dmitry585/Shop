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

        // POST: api/ProductTypes
        [HttpPost]
        public async Task<ProductType> Post([FromForm] ProductType productType)
        {
            var ptm = new ProductTypeModification(_context);
            var result = await ptm.CreateProductType(productType);
            return result;
        }

        // PUT: api/ProductTypes/5
        [HttpPut("{id}")]
        public async Task<ProductType> Put(int id, [FromForm] ProductType productType)
        {
            var ptm = new ProductTypeModification(_context);
            var result = await ptm.EditProductType(id,productType);
            return result;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var ptr = new ProductTypeRepository(_context);
            var productType = ptr.GetProductTypeById(id);
            var ptm = new ProductTypeModification(_context);
            ptm.DeleteProductType(productType);
        }
    }
}
