using Microsoft.EntityFrameworkCore;

namespace EntityDatabase.Data.Repositories
{
    public abstract class BaseRepository<TModel> where TModel : Model.Models.Model
    {
        public ApplicationContext _context { get;}

        public BaseRepository(ApplicationContext context)
        {
            this._context = context;
        }

        public DbSet<TModel> StartCondition()
        {
            return _context.Set<TModel>();
        }
    }
}
