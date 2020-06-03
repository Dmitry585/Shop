using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace Model.Models
{
    public class Order : Model
    {
        public int OrderId { get; set; }

        [NotMapped]
        public virtual ICollection<Ord> Items { get; set; }

        [Column("Items")]
        [EditorBrowsable(EditorBrowsableState.Never)]
        [DebuggerBrowsable(DebuggerBrowsableState.Never)]
        public string PointsXml
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
