using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface ICategoriesRepository
    {
        Category Create(Category category);
        void Delete(int categoryId);
        IEnumerable<Category>? GetAll();
        Category? GetById(int id);
        Category? Update(Category category);
    }
}