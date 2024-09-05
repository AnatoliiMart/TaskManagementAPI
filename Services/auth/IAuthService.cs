using TaskManagementAPI.Models;

namespace TaskManagementAPI.Services
{
    public interface IAuthService
    {
        string GenerateJwtToken(User user);
    }
}
