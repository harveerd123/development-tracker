using DevelopmentTracker.Server.Database;
using DevelopmentTracker.Server.Model;

namespace DevelopmentTracker.Server.Services
{
    public class DataService
    {
        private readonly ApplicationDbContext _context;

        public DataService(ApplicationDbContext context)
        {
            _context = context;
        }

        public void SeedDevelopments()
        {
            var developments = new List<Developments>
            {
                new Developments
                {
                    Id = 1,
                    Name = "Bug Fix - Login Issue",
                    DevelopmentType = "Bugs",
                    Description = "Fixes a bug where users are unable to log in using their email.",
                    Status = "In Progress",
                    DueDate = DateTime.Parse("2025-04-15"),
                    ImplementationDate = null,
                    version = "1.3.0"
                },
                new Developments
                {
                    Id = 2,
                    Name = "New Feature - Dark Mode",
                    DevelopmentType = "New Features",
                    Description = "Adds dark mode option for users to switch the app theme.",
                    Status = "Completed",
                    DueDate = DateTime.Parse("2025-03-30"),
                    ImplementationDate = DateTime.Parse("2025-03-28"),
                    version = "2.0.0"
                },
                new Developments
                {
                    Id = 3,
                    Name = "Optimisation - Load Time Reduction",
                    DevelopmentType = "Optimisation",
                    Description = "Improves the load time of the dashboard by 40%.",
                    Status = "In Progress",
                    DueDate = DateTime.Parse("2025-05-01"),
                    ImplementationDate = null,
                    version = "1.2.5"
                },
                new Developments
                {
                    Id = 4,
                    Name = "Bug Fix - Payment Gateway Error",
                    DevelopmentType = "Bugs",
                    Description = "Fixes an issue where the payment gateway fails on certain devices.",
                    Status = "Testing",
                    DueDate = DateTime.Parse("2025-04-10"),
                    ImplementationDate = null,
                    version = "1.3.1"
                },
                new Developments
                {
                    Id = 5,
                    Name = "New Feature - User Profiles",
                    DevelopmentType = "New Features",
                    Description = "Introduces user profiles where users can view and edit their information.",
                    Status = "In Progress",
                    DueDate = DateTime.Parse("2025-04-20"),
                    ImplementationDate = null,
                    version = "1.4.0"
                },
                new Developments
                {
                    Id = 6,
                    Name = "Optimisation - Database Indexing",
                    DevelopmentType = "Optimisation",
                    Description = "Optimises database queries by adding proper indexing to frequently accessed tables.",
                    Status = "Completed",
                    DueDate = DateTime.Parse("2025-03-25"),
                    ImplementationDate = DateTime.Parse("2025-03-24"),
                    version = "1.2.0"
                }
            };

            if (!_context.Developments.Any())
            {
                _context.Developments.AddRange(developments);
                _context.SaveChanges();
            }
        }
    }
}
