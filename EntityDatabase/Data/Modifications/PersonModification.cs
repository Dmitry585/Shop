using EntityDatabase.Data.Repositories;
using Helpers.Helpers;
using Model.Models;
using System;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Modifications
{
    public class PersonModification : BaseModification<Person>
    {
        public PersonModification(ApplicationContext _context) : base(_context) { }

        public async Task<Person> CreatePerson(Person person)
        {
            PersonPasswordHasher pph = new PersonPasswordHasher();
            person.Password = pph.HashPassword(person,person.Password);
            person.RoleId = 2;
            try
            {
                StartCondition().Add(person);
                var result = await _context.SaveChangesAsync();
                return person;
            }
            catch{}
            return null;
        }

        public async Task<Person> EditPerson(int id,Person newPerson)
        {
            try
            {
                PersonRepository pr = new PersonRepository(_context);
                Person person = pr.GetPersonById(id);
                if (person != null)
                {
                    person = newPerson;
                    await _context.SaveChangesAsync();
                    return person;
                }
            }
            catch { }
            return null;
        }

        public  bool DeletePerson(Person person)
        {
            try
            {
                _context.Persons.Remove(person);
                _context.SaveChanges();
                return true;
            }
            catch(Exception e)
            {
                System.Console.WriteLine(e.Message);
            }
            return false;
        }
    }
}
