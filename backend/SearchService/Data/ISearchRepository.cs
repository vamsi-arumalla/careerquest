using SearchService.Models;

namespace SearchService.Data
{
    public interface ISearchRepository
    {
        Task<bool> IndexJobAsync(Job job);
        Task<IEnumerable<Job>> SearchJobsAsync(string query);
    }
}
