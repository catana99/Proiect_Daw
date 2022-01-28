namespace backend.Models
{
    public class EventImage
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public string Base64String { get; set; }
        public Event Event { get; set; }
    }
}
