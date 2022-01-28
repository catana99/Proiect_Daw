using backend.Models;

namespace backend.Repositories
{
    public interface IEventsRepository 
    {
        Event Create(string name, string description, DateTime date, int[] categories);
        Event? Update(int id, string name, string description, DateTime date, int[] categories);
        void Delete(int eventId);
        IEnumerable<Event>? GetAll();
        Event? GetById(int id);
        IEnumerable<Tuple<string, int>> GetSummary();
    }
}