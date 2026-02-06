using UserService.Models;

namespace UserService.Data
{
    public interface IUserRepository
    {
        Task<User?> GetUserByIdAsync(int id);
        Task<User> CreateUserAsync(User user);
        Task<User?> GetUserByEmailAsync(string email);
    }
}
