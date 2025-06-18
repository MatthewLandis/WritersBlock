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
            if (request == null || string.IsNullOrEmpty(request.Username) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("All fields are required.");
            }

            User? user = await _userService.LoginUser(request);

            return user != null ? Ok(user) : BadRequest("User already exists.");
        }

        [HttpGet("user/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            User? user = await _userService.GetUserById(id);

            if (user == null) return NotFound("User not found.");

            return Ok(user);
        }







        //[HttpPut("user")]
        //public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        //{
        //    var existingUser = await _userService.GetUserById(id);
        //    if (existingUser == null)
        //        return NotFound("User not found.");

        //    bool success = await _userService.UpdateUser(id, updatedUser);

        //    return success ? Ok("User updated.") : BadRequest("Update failed.");
        //}

    }
}
