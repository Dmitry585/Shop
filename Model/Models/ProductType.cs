using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace Model.Models
{
    public class ProductType : Model
    {
        public int ProductTypeId { get; set; }
        public string Name { get; set; }
    }
}
