using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class EventsRepository : IBaseRepository<Event>
    {
        public DbSet<Event> DbSet { get; }
        public EventContext EventContext { get; }

        public EventsRepository(EventContext dbContext)
        {
            EventContext = dbContext;
            DbSet = dbContext.Set<Event>();
        }

        public Event? GetById(int id) => DbSet.FirstOrDefault(x => x.Id == id);
        public IEnumerable<Event>? GetAll() => DbSet.ToList();
        public Event Create(Event @event)
        {
            DbSet.Add(@event);
            return @event;
        }
        public Event Update(Event @event)
        {
            var currentEvent = GetById(@event.Id);
            if (currentEvent == null)
            {
                return Create(@event);
            }
            else
            {
                currentEvent.Name = @event.Name;
                currentEvent.Description = @event.Description;
                DbSet.Update(currentEvent);

                return currentEvent;
            }
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
