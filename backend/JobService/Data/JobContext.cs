using Microsoft.EntityFrameworkCore;
using JobService.Models;

namespace JobService.Data
{
    public class JobContext : DbContext
    {
        public JobContext(DbContextOptions<JobContext> options) : base(options) { }

        public DbSet<Job> Jobs { get; set; }
    }
}
