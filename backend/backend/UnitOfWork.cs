using backend.Models;
using backend.Repositories;

namespace backend
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly EventContext EventContext;
        private readonly IHttpContextAccessor HttpContextAccessor;

        private IEventsRepository EventsRepositoryField;
        public IEventsRepository EventsRepository
        {
            get
            {
                if (EventsRepositoryField == null)
                    EventsRepositoryField = HttpContextAccessor.HttpContext.RequestServices.GetRequiredService<IEventsRepository>();

                return EventsRepositoryField;
            }
        }

        private IEventImagesRepository EventImagesRepositoryField;
        public IEventImagesRepository EventImagesRepository
        {
            get
            {
                if (EventImagesRepositoryField == null)
                    EventImagesRepositoryField = HttpContextAccessor.HttpContext.RequestServices.GetRequiredService<IEventImagesRepository>();

                return EventImagesRepositoryField;
            }
        }

        private ICategoriesRepository EventCategoriesRepositoryField;
        public ICategoriesRepository CategoriesRepository
        {
            get
            {
                if (EventCategoriesRepositoryField == null)
                    EventCategoriesRepositoryField = HttpContextAccessor.HttpContext.RequestServices.GetRequiredService<ICategoriesRepository>();

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
