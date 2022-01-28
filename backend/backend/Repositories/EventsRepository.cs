using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        private DbSet<Event> DbSet { get; }
        private EventContext EventContext { get; }
        private IUnitOfWork UnitOfWork { get; }

        public EventsRepository(EventContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            EventContext = dbContext;
            DbSet = dbContext.Set<Event>();
            UnitOfWork = httpContextAccessor.HttpContext.RequestServices.GetRequiredService<IUnitOfWork>();
        }

        public Event? GetById(int id) => DbSet.Include(x => x.Categories).FirstOrDefault(x => x.Id == id);
        public IEnumerable<Event>? GetAll() => DbSet.Include(x => x.Categories).ToList();
        public Event Create(string name, string description, DateTime date, int[] categories)
        {
            Event newEvent = new()
            {
                Name = name,
                Description = description,
                Date = date,
                Categories = new List<Category>()
            };

            foreach (var categoryId in categories)
            {
                var category = UnitOfWork.CategoriesRepository.GetById(categoryId);
                if (category != null)
                {
                    newEvent.Categories.Add(category);
                }
            }

            DbSet.Add(newEvent);
            return newEvent;
        }
        public Event? Update(int id, string name, string description, DateTime date, int[] categories)
        {
            var currentEvent = GetById(id);
            if (currentEvent != null)
            {
                currentEvent.Name = name;
                currentEvent.Description = description;
                currentEvent.Date = date;
                currentEvent.Categories?.Clear();

                foreach (var categoryId in categories)
                {
                    var category = UnitOfWork.CategoriesRepository.GetById(categoryId);
                    if (category != null)
                    {
                        currentEvent.Categories.Add(category);
                    }
                }

                DbSet.Update(currentEvent);
            }

            return currentEvent;
        }
        public void Delete(int eventId)
        {
            Event? @event = GetById(eventId);
            if (@event == null)
                return;

            DbSet.Remove(@event);
        }
        public IEnumerable<Tuple<string, int>> GetSummary()
        {
            IEnumerable<Event>? ret = GetAll();
            if (ret == null)
            {
                return Enumerable.Empty<Tuple<string, int>>();
            }

            return ret.SelectMany(x => x.Categories).GroupBy(x => x.Name).Select(x => new Tuple<string, int>(x.Key, x.First().Events.Count));
        }
    }
}
