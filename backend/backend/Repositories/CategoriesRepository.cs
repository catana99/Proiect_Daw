using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        public DbSet<Category> DbSet { get; }
        public EventContext EventContext { get; }

        public CategoriesRepository(EventContext dbContext)
        {
            EventContext = dbContext;
            DbSet = dbContext.Set<Category>();
        }

        public Category? GetById(int id) => DbSet.FirstOrDefault(x => x.Id == id);
        public IEnumerable<Category>? GetAll() => DbSet.ToList();
        public Category Create(Category category)
        {
            DbSet.Add(category);
            return category;
        }
        public Category? Update(Category category)
        {
            var currentCategory = GetById(category.Id);
            if (currentCategory == null)
            {
                currentCategory.Name = category.Name;
                DbSet.Update(currentCategory);
            }
            return currentCategory;
        }
        public void Delete(int categoryId)
        {
            Category? category = GetById(categoryId);
            if (category == null)
                return;

            DbSet.Remove(category);
        }
    }
}
