using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IEventImagesRepository 
    {
        DbSet<EventImage> DbSet { get; }
        EventContext EventContext { get; }

        EventImage Create(EventImage image);
        void Delete(int eventImageId);
        IEnumerable<EventImage>? GetAll();
        IEnumerable<EventImage>? GetAll(int eventId);
        EventImage? GetById(int id);
    }
}