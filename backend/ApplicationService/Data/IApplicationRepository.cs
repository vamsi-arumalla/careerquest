using ApplicationService.Models;

namespace ApplicationService.Data
{
    public interface IApplicationRepository
    {
        Task<Application> CreateApplicationAsync(Application application);
        Task<IEnumerable<Application>> GetApplicationsByUserIdAsync(int userId);
    }
}
