using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class EventImagesRepository : IEventImagesRepository
    {
        public DbSet<EventImage> DbSet { get; }
        public EventContext EventContext { get; }

        public EventImagesRepository(EventContext dbContext)
        {
            EventContext = dbContext;
            DbSet = dbContext.Set<EventImage>();
        }

        public EventImage? GetById(int id) => DbSet.FirstOrDefault(x => x.Id == id);
        public IEnumerable<EventImage>? GetAll() => DbSet.ToList();
        public IEnumerable<EventImage>? GetAll(int eventId) => DbSet.Where(x => x.EventId == eventId).ToList();
        public EventImage Create(EventImage image)
        {
            DbSet.Add(image);
            return image;
        }
        public void Delete(int eventImageId)
        {
            EventImage? eventImage = GetById(eventImageId);
            if (eventImage == null)
                return;

            DbSet.Remove(eventImage);
        }
    }
}
