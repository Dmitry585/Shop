using EntityFrameworkCore.Triggers;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Xml.Serialization;

namespace Model.Models
{
    public class Rezervation : Model
    {

        public Rezervation()
        {
        }

        public int RezervationId { get; set; }
        public string PersonName { get; set; }
        public DateTime RezervationDate { get; set; }
        public int? TableId { get; set; }

        public Table Table { get; set; }
        [NotMapped]
        public virtual ICollection<Ord> Items { get; set; }

        [Column("Items")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        public string OrderXml
        {
            get
            {
                var serializer = new XmlSerializer(typeof(List<Ord>));
                using (var stringWriter = new StringWriter())
                {
                    serializer.Serialize(stringWriter, Items.ToList());
                    stringWriter.Flush();
                    return stringWriter.ToString();
                }
            }
            set
            {
                var serializer = new XmlSerializer(typeof(List<Ord>));
                using (var stringReader = new StringReader(value))
                {
                    Items = (List<Ord>)serializer.Deserialize(stringReader);
                }
            }
        }

    }

    public class Ord
    {
        public int Id { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }

        public int Count { get; set; }

    }
}
