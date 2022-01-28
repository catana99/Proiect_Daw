using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public interface IEventImagesRepository 
    {
        EventImage Create(EventImage image);
        void Delete(int eventImageId);
        IEnumerable<EventImage>? GetAll();
        IEnumerable<EventImage>? GetAll(int eventId);
        EventImage? GetById(int id);
    }
}