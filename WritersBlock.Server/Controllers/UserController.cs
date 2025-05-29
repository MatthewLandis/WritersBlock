using Microsoft.AspNetCore.Mvc;
using WritersBlock.Server.Services;
using WritersBlock.Server.Models;

namespace writersblock.server.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController(IUserService userService) : ControllerBase
    {
        private readonly IUserService _userService = userService;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User request)
        {
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("All fields are required.");
            }

            int userID = await _userService.RegisterUser(request);

            return userID > 0 ? Ok(new { id = userID, username = request.Username }) : BadRequest("User already exists.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User request)
        {
            if (request == null || string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("All fields are required.");
            }

            int? user = await _userService.LoginUser(request);

            return user != null ? Ok(new { id = user }) : BadRequest("User already exists.");
        }
    }
}
