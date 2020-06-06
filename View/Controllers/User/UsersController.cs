using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EntityDatabase.Data;
using EntityDatabase.Data.Modifications;
using EntityDatabase.Data.Repositories;
using Microsoft.AspNetCore.Mvc;
using Model.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace View.Controllers.User
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        // тестовые данные вместо использования базы данных
        public UsersController(ApplicationContext context)
        {
            this._context = context;
        }
        // GET: api/Users
        [HttpGet]
        public object Get()
        {
            var pr = new PersonRepository(_context);
            var result = pr.GetAllPersons();
            return result;
        }

        // PUT api/Users/5
        [HttpPut("{id}")]
        public async Task<Person> Put(int id, [FromForm]Person person)
        {
            var prm = new PersonModification(_context);
            var result = await prm.EditPerson(id,person);
            return result;
        }

        // DELETE api/Users/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var pr = new PersonRepository(_context);
            var person = pr.GetPersonById(id);
            var prm = new PersonModification(_context);
            prm.DeletePerson(person);
        }
    }
}
