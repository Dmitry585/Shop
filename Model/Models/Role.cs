using System.Collections.Generic;

namespace Model.Models
{
    public class Role : Model
    {
        public int RoleId { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Person> Persons { get; set; }
    }
}
