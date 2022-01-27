using backend.Repositories;

namespace backend
{
    public interface IUnitOfWork
    {
        public IEventsRepository EventsRepository { get; }
        public IEventImagesRepository EventImagesRepository { get; }
        public ICategoriesRepository CategoriesRepository { get; }

        public void SaveChanges();
    }
}