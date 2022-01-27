using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class EventsRepository : IEventsRepository
    {
        public DbSet<Event> DbSet { get; }
        public EventContext EventContext { get; }

        public EventsRepository(EventContext dbContext)
        {
            EventContext = dbContext;
            DbSet = dbContext.Set<Event>();
        }

        public Event? GetById(int id) => DbSet.Include(x => x.Categories).FirstOrDefault(x => x.Id == id);
        public IEnumerable<Event>? GetAll() => DbSet.Include(x => x.Categories).ToList();
        public Event Create(Event @event)
        {
            DbSet.Add(@event);
            return @event;
        }
        public Event? Update(Event @event)
        {
            var currentEvent = GetById(@event.Id);
            if (currentEvent != null)
            {
                currentEvent.Name = @event.Name;
                currentEvent.Description = @event.Description;
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
