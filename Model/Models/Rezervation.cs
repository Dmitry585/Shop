using System;
using System.ComponentModel;

namespace Model.Models
{
    public class Rezervation : Model
    {
        public int RezervationId { get; set; }
        public int PersonsCount { get; set; }
        public DateTime RezervationDate { get; set; }
        public int TableId { get; set; }

        public Table Table { get; set; }  
    }
}
