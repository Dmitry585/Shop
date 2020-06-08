using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using ClosedXML.Excel;
using EntityDatabase.Data;
using EntityDatabase.Data.Modifications;
using EntityDatabase.Data.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using View.Interfaces;

namespace View.Controllers.Shop
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase , IExportController
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

        private void CreateWorksheet()
        {
            var pr = new ProductRepository(_context);
            var items = pr.GetAllProductsXlsx();
            var workbook = new XLWorkbook();
            var ws = workbook.Worksheets.Add("Export");
            ws.Cell(1, 1).Value = "ID";
            ws.Cell(1, 2).Value = "Наименование";
            ws.Cell(1, 3).Value = "Цена";
            ws.Cell(1, 4).Value = "Количество";
            ws.Cell(1, 5).Value = "Описание";
            ws.Cell(1, 6).Value = "Тип";
            for (int i = 0; i < items.Count; i++)
            {
                var item = items[i];
                ws.Cell(i+2, 1).Value = item.ProductId;
                ws.Cell(i + 2, 2).Value = item.Name;
                ws.Cell(i + 2, 3).Value = item.Price;
                ws.Cell(i + 2, 4).Value = item.Count;
                ws.Cell(i + 2, 5).Value = item.About;
                ws.Cell(i + 2, 6).Value = item.Type.Name;
            }
            ws.Column(1).AdjustToContents();
            ws.Column(2).AdjustToContents();
            ws.Column(3).AdjustToContents();
            ws.Column(4).AdjustToContents();
            ws.Column(5).AdjustToContents();
            ws.Column(6).AdjustToContents();
            workbook.SaveAs("product.xlsx");
        }

        [HttpGet]
        [Route("xlsx")]
        public IActionResult GetXLSX()
        {
            CreateWorksheet();
            var fileBytes = System.IO.File.ReadAllBytes("product.xlsx");
            var fileMemoryStream = new MemoryStream(fileBytes);
            System.IO.File.Delete("product.xlsx");

            return File(fileMemoryStream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "product.xlsx");
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
