using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Text.Json.Serialization;

namespace backend.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [JsonIgnore]
        public ICollection<Event>? Events { get; set; }
        [JsonIgnore]
        public List<EventCategory>? EventCategories { get; set; }
    }
}
