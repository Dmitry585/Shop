using Microsoft.EntityFrameworkCore;
using Model.Models;
using System.Collections.Generic;
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

        public Person GetPersonById(int id)
        {
            var result = base.StartCondition().FirstOrDefault(x => x.PersonId == id);
            return result;
        }

        public object GetAllPersons()
        {
            var result = base.StartCondition().Select(x=>new { 
                x.PersonId,
                x.Login,
                x.RoleId    
            }).ToList();
            return result;
        }
    }
}
