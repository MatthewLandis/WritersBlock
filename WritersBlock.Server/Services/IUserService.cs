using WritersBlock.Server.Models;

namespace WritersBlock.Server.Services
{
    public interface IUserService
    {
        Task<int>RegisterUser(User request);
        Task<int>LoginUser(User request);
    }
}
