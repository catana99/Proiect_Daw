using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        protected IEventsRepository EventsRepository { get; set; }
        protected IUnitOfWork UnitOfWork { get; set; }
        public EventsController(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            EventsRepository = UnitOfWork.EventsRepository;
        }

        [HttpPost]
        public int AddEvent(Event @event)
        {
            var newEvent = EventsRepository.Create(@event);
            UnitOfWork.SaveChanges();
            return newEvent.Id;
        }

        [HttpPatch]
        public Event? UpdateEvent(Event @event)
        {
            var updatedEvent = EventsRepository.Update(@event);
            if (updatedEvent != null)
                UnitOfWork.SaveChanges();

            return updatedEvent;
        }

        [HttpPatch]
        public IActionResult DeleteEvent(int eventId)
        {
            EventsRepository.Delete(eventId);
            UnitOfWork.SaveChanges();
            return Ok();
        }

        [HttpGet]
        public IEnumerable<Event>? GetEvents() => EventsRepository.GetAll();

        [HttpGet]
        public Event? GetEvent(int id) => EventsRepository.GetById(id);

        [HttpGet]
        public IEnumerable<Tuple<string, int>> GetSummary() => EventsRepository.GetSummary();
    }
}
