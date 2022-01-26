using backend.Models;
using backend.Repositories;

namespace backend
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EventContext EventContext;
        private readonly IHttpContextAccessor HttpContextAccessor;

        private IBaseRepository<Event> EventsRepositoryField;
        public IBaseRepository<Event> EventsRepository
        {
            get
            {
                if (EventsRepositoryField == null)
                    EventsRepositoryField = HttpContextAccessor.HttpContext.RequestServices.GetRequiredService<IBaseRepository<Event>>();

                return EventsRepositoryField;
            }
        }

        private IBaseRepository<EventImage> EventImagesRepositoryField;
        public IBaseRepository<EventImage> EventImagesRepository
        {
            get
            {
                if (EventImagesRepositoryField == null)
                    EventImagesRepositoryField = HttpContextAccessor.HttpContext.RequestServices.GetRequiredService<IBaseRepository<EventImage>>();

                return EventImagesRepositoryField;
            }
        }

        private IBaseRepository<Category> EventCategoriesRepositoryField;
        public IBaseRepository<Category> EventCategoriesRepository
        {
            get
            {
                if (EventCategoriesRepositoryField == null)
                    EventCategoriesRepositoryField = HttpContextAccessor.HttpContext.RequestServices.GetRequiredService<IBaseRepository<Category>>();

                return EventCategoriesRepositoryField;
            }
        }

        public UnitOfWork(EventContext eventContext, IHttpContextAccessor httpContextAccessor)
        {
            EventContext = eventContext;
            HttpContextAccessor = httpContextAccessor;
        }

        public void SaveChanges()
        {
            EventContext.SaveChanges();
        }
    }
}
