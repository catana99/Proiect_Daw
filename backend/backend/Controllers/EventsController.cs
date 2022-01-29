using backend.Models;
using backend.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [Route("api/[controller]/[action]")]
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
        public int AddEvent(string name ,string description, DateTime date, [FromBody] int[] categories)
        {
            var newEvent = EventsRepository.Create(name, description, date, categories);
            UnitOfWork.SaveChanges();
            return newEvent.Id;
        }

        [HttpPatch]
        public Event? UpdateEvent(int id, string name, string description, DateTime date, [FromBody]int[] categories)
        {
            var updatedEvent = EventsRepository.Update(id, name, description, date, categories);
            if (updatedEvent != null)
                UnitOfWork.SaveChanges();

            return updatedEvent;
        }

        [HttpDelete]
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
