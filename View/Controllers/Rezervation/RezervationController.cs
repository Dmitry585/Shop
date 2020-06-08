using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Office.CustomUI;
using EntityDatabase.Data;
using EntityDatabase.Data.Modifications;
using EntityDatabase.Data.Repositories;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models;
using Font = iTextSharp.text.Font;
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

        private void CreatePdf()
        {
            var rr = new RezervationRepository(_context);
            var items = rr.GetRezervation();
                        string ttf = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Fonts), "ARIAL.TTF");
            var baseFont = BaseFont.CreateFont(ttf, BaseFont.IDENTITY_H, BaseFont.NOT_EMBEDDED);
            var font = new Font(baseFont, iTextSharp.text.Font.DEFAULTSIZE, iTextSharp.text.Font.NORMAL);

            var doc = new Document();
            PdfWriter.GetInstance(doc, new FileStream("orders.pdf", FileMode.Create));
            doc.Open();
            foreach(var item in items)
            {
                Phrase text = new Paragraph("Заказ от " + item.PersonName + " на " + item.RezervationDate +"\n\n",font);
                doc.Add(text);
                PdfPTable table = new PdfPTable(4);
                PdfPCell cell = new PdfPCell(new Phrase("Заказ",
                  new iTextSharp.text.Font(iTextSharp.text.Font.FontFamily.TIMES_ROMAN, 16,
                  iTextSharp.text.Font.NORMAL, new BaseColor(Color.White))));
                cell.BackgroundColor = new BaseColor(Color.White);
                cell.Padding = 5;
                cell.Colspan = 4;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(cell);
                table.AddCell(new Phrase("Наименование",font));
                table.AddCell(new Phrase("Количество", font));
                table.AddCell(new Phrase("цена", font));
                table.AddCell(new Phrase("Итог", font));
                float summ = 0;
                if (item.Items != null)
                {
                    foreach (var ord in item.Items)
                    {
                        if(ord.Product != null)
                        {
                            table.AddCell(new Phrase(ord.Product.Name, font));
                            table.AddCell(new Phrase(ord.Count.ToString(), font));
                            table.AddCell(new Phrase(ord.Product.Price.ToString(), font));
                            table.AddCell(new Phrase((ord.Count * ord.Product.Price).ToString(), font));
                            summ += ord.Count * ord.Product.Price;
                        }
                    }
                }
                cell = new PdfPCell(new Phrase("Сумма "+summ.ToString(),font));
                cell.BackgroundColor = new BaseColor(Color.White);
                cell.Padding = 5;
                cell.Colspan = 4;
                cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(cell);
                doc.Add(table);
                doc.NewPage();
            }
           
            doc.Close();
        }

        [HttpGet]
        [Route("pdf")]
        public IActionResult Pdf()
        {
            CreatePdf();
            var fileBytes = System.IO.File.ReadAllBytes("orders.pdf");
            var fileMemoryStream = new MemoryStream(fileBytes);
            System.IO.File.Delete("orders.pdf");
            return File(fileMemoryStream, "application/pdf", "orders.pdf");
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
