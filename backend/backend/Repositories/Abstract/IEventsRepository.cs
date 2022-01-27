using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IEventsRepository 
    {
        DbSet<Event> DbSet { get; }
        EventContext EventContext { get; }

        Event Create(Event @event);
        void Delete(int eventId);
        IEnumerable<Event>? GetAll();
        Event? GetById(int id);
        IEnumerable<Tuple<string, int>> GetSummary();
        Event? Update(Event @event);
    }
}