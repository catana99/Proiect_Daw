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
            var eventSet = modelBuilder.Entity<Event>();
            eventSet.ToTable("Events");
            eventSet.HasMany(x => x.Categories).WithMany(x => x.Events).UsingEntity<EventCategory>(
                j => j
                    .HasOne(pt => pt.Category)
                    .WithMany(t => t.EventCategories)
                    .HasForeignKey(pt => pt.CategoryId),
                j => j
                    .HasOne(pt => pt.Event)
                    .WithMany(p => p.EventCategories)
                    .HasForeignKey(pt => pt.EventId),
                j =>
                {
                    j.HasKey(t => new { t.EventId, t.CategoryId });
                });

            eventSet.HasMany(x => x.Images).WithOne(x => x.Event).HasForeignKey(x=>x.EventId);

            modelBuilder.Entity<EventImage>().ToTable("EventImages");
            modelBuilder.Entity<Category>().ToTable("Categories");
        }
    }
}
