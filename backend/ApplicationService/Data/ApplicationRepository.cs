using ApplicationService.Models;
using Microsoft.EntityFrameworkCore;

namespace ApplicationService.Data
{
    public class ApplicationRepository : IApplicationRepository
    {
        private readonly ApplicationContext _context;

        public ApplicationRepository(ApplicationContext context)
        {
            _context = context;
        }

        public async Task<Application> CreateApplicationAsync(Application application)
        {
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();
            return application;
        }

        public async Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(int userId)
        {
            return await _context.Applications.Where(a => a.UserId == userId).ToListAsync();
        }
    }
}
