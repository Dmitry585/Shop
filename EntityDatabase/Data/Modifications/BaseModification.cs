using Microsoft.EntityFrameworkCore;

namespace EntityDatabase.Data.Modifications
{
    public abstract class BaseModification<TModel> where TModel : Model.Models.Model
    {
        public ApplicationContext _context { get; }

        public BaseModification(ApplicationContext context)
        {
            this._context = context;
        }

        public DbSet<TModel> StartCondition()
        {
            return _context.Set<TModel>();
        }
    }
}
