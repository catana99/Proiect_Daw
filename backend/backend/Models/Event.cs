using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public ICollection<Category>? Categories { get; set; }
        public ICollection<EventImage>? Images { get; set; }
        [JsonIgnore]
        public List<EventCategory>? EventCategories { get; set; }
    }
}
