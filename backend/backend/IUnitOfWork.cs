using backend.Models;
using backend.Repositories;

namespace backend
{
    public interface IUnitOfWork
    {
        public IBaseRepository<Event> EventsRepository { get; }
        public IBaseRepository<EventImage> EventImagesRepository { get; }
        public IBaseRepository<Category> EventCategoriesRepository { get; }

        public void SaveChanges();
    }
}