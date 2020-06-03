using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models
{
    public class Product : Model
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public float Price { get; set; }
        public int Count { get; set; }
        public string Image { get; set; }
        public string About { get; set; }
        public int ProductTypeId { get; set; }

        public ProductType Type { get; set; }
    }
}
