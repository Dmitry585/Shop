using EntityDatabase.Data.Repositories;
using Helpers.Helpers;
using Model.Models;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Modifications
{
    public class PersonModification : BaseModification<Person>
    {
        public PersonModification(ApplicationContext _context) : base(_context) { }

        public async Task CreatePerson(Person person)
        {
            PersonPasswordHasher pph = new PersonPasswordHasher();
            person.Password = pph.HashPassword(person,person.Password);
            person.RoleId = 2;
            try
            {
                StartCondition().Add(person);
                var result = await _context.SaveChangesAsync();
            }
            catch{}
        }
    }
}
