using Model.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EntityDatabase.Data.Repositories
{
    public class RoleRepository : BaseRepository<Role>
    {
        public RoleRepository(ApplicationContext _context) : base(_context) { }

        public Role GetUserRoleId()
        {
            var result = base.StartCondition().FirstOrDefault(x => x.RoleId == 2);
            return result;
        }
    }
}
