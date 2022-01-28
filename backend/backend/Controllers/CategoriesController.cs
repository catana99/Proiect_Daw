using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        protected ICategoriesRepository CategoriesRepository { get; set; }
        protected IUnitOfWork UnitOfWork { get; set; }
        public CategoriesController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            CategoriesRepository = UnitOfWork.CategoriesRepository;
        }

        [HttpPost]
        public int AddCategory(Category category)
        {
            var newCategory = CategoriesRepository.Create(category);
            UnitOfWork.SaveChanges();
            return newCategory.Id;
        }

        [HttpDelete]
        public IActionResult DeleteCategory(int categoryId)
        {
            CategoriesRepository.Delete(categoryId);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public Category? GetCategory(int id) => CategoriesRepository.GetById(id);

        [HttpGet]
        public IEnumerable<Category>? GetCategories() => CategoriesRepository.GetAll();
    }
}
