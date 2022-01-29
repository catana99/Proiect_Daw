using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EventImagesController : ControllerBase
    {
        protected IEventImagesRepository EventImagesRepository { get; set; }
        protected IUnitOfWork UnitOfWork { get; set; }
        public EventImagesController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            EventImagesRepository = UnitOfWork.EventImagesRepository;
        }

        [HttpPost]
        public int AddImage(int eventId, [FromBody] string base64string)
        {
            var newImage = EventImagesRepository.Create(new EventImage() { EventId = eventId, Base64String = base64string });
            UnitOfWork.SaveChanges();
            return newImage.Id;
        }

        [HttpDelete]
        public IActionResult DeleteImage(int imageId)
        {
            EventImagesRepository.Delete(imageId);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public EventImage? GetImage(int id) => EventImagesRepository.GetById(id);

        [HttpGet]
        public IEnumerable<EventImage>? GetImages() => EventImagesRepository.GetAll();

        [HttpGet]
        public IEnumerable<EventImage>? GetImagesByEventId(int eventId) => EventImagesRepository.GetAll(eventId);

    }
}
