using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class EventContext : DbContext
    {
        public EventContext(DbContextOptions<EventContext> options) : base(options)
        {
        }

        public DbSet<Event> Students { get; set; }
        public DbSet<EventImage> EventImages { get; set; }
        public DbSet<Category> EventCategories { get; set; }

     
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Event>().ToTable("Events");
            modelBuilder.Entity<EventImage>().ToTable("EventImages");
            modelBuilder.Entity<Category>().ToTable("EventCategories");
        }
    }
}
