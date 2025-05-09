using DevelopmentTracker.Server.Model;
using Microsoft.EntityFrameworkCore;

namespace DevelopmentTracker.Server.Database
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Developments> Developments { get; set; }
    }
}
