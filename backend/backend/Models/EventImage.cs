﻿namespace backend.Models
{
    public class EventImage
    {
        public int Id { get; set; }
        public string Base64String { get; set; }
        public virtual Event Event { get; set; }
    }
}
