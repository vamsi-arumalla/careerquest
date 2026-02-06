using Microsoft.EntityFrameworkCore;
using ApplicationService.Models;

namespace ApplicationService.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        public DbSet<Application> Applications { get; set; }
    }
}
