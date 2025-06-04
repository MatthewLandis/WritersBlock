using WritersBlock.Server.Models;

namespace WritersBlock.Server.Services
{
    public interface IUserService
    {
        Task<int>RegisterUser(User request);
        Task<User?>LoginUser(User request);
        Task<User?> GetUserById(int id);
        //Task<bool> UpdateUser(int id, User updatedUser);
    }
}
