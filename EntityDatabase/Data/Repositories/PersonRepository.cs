using Microsoft.EntityFrameworkCore;
using Model.Models;
using System.Linq;

namespace EntityDatabase.Data.Repositories
{
    public class PersonRepository : BaseRepository<Person>
    {
        public PersonRepository(ApplicationContext _context) : base(_context){}

        public Person GetPersonByLogin(string username)
        {
            var result = base.StartCondition().Include(person => person.Role).FirstOrDefault(x => x.Login == username);
            return result;
        }
    }
}
