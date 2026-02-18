using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using ExamSystem.Models;
using ExamSystem.Data;
using Microsoft.EntityFrameworkCore;
using BC = BCrypt.Net.BCrypt; // استخدام Alias لتجنب التضارب


namespace ExamSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ExamSystemDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ExamSystemDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                Console.WriteLine($"🔍 Login attempt for user: {model.Username}");
                
                var user = await _context.Users
                    .FirstOrDefaultAsync(u => u.Username == model.Username && u.IsActive);

                Console.WriteLine($"👤 User found: {user != null}");
                if (user != null)
                {
                    Console.WriteLine($"👤 User ID: {user.Id}, UserType: {user.UserType}, IsActive: {user.IsActive}");
                }

                if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
                {
                    Console.WriteLine("❌ Login failed: Invalid credentials");
                    return Unauthorized(new { message = "Invalid username or password" });
                }

                var token = GenerateJwtToken(user);
                Console.WriteLine("✅ Login successful, token generated");
                return Ok(new { token, user = new { user.Id, user.Username, user.Email, user.FullName, user.UserType } });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 Login error: {ex.Message}");
                Console.WriteLine($"💥 Stack trace: {ex.StackTrace}");
                return StatusCode(500, new { message = "Internal server error during login", error = ex.Message });
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (await _context.Users.AnyAsync(u => u.Username == model.Username))
            {
                return BadRequest(new { message = "Username already exists" });
            }

            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
            {
                return BadRequest(new { message = "Email already exists" });
            }

            var user = new User
            {
                Username = model.Username,
                Email = model.Email,
                FullName = model.FullName,
                UserType = model.UserType,
                PasswordHash = HashPassword(model.Password),
                CreatedDate = DateTime.Now,
                IsActive = true
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return Ok(new { token, user = new { user.Id, user.Username, user.Email, user.FullName, user.UserType } });
        }

        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = await _context.Users.FindAsync(userId);

            if (user == null || !VerifyPassword(model.CurrentPassword, user.PasswordHash))
            {
                return BadRequest(new { message = "Current password is incorrect" });
            }

            user.PasswordHash = HashPassword(model.NewPassword);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Password changed successfully" });
        }

        [HttpGet("profile")]
        public async Task<IActionResult> GetProfile()
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new { user.Id, user.Username, user.Email, user.FullName, user.UserType, user.CreatedDate });
        }

        [HttpPut("profile")]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileModel model)
        {
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            user.FullName = model.FullName;
            
            await _context.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully", user = new { user.Id, user.Username, user.Email, user.FullName, user.UserType } });
        }

        private string GenerateJwtToken(User user)
        {
            try
            {
                Console.WriteLine("🔑 Generating JWT token...");
                Console.WriteLine($"🔑 JWT Key: {_configuration["Jwt:Key"]}");
                Console.WriteLine($"🔑 JWT Issuer: {_configuration["Jwt:Issuer"]}");
                Console.WriteLine($"🔑 JWT Audience: {_configuration["Jwt:Audience"]}");
                
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var claims = new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Username),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.UserType)
                };

                var token = new JwtSecurityToken(
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: credentials
                );

                var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
                Console.WriteLine("✅ JWT token generated successfully");
                return tokenString;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 JWT token generation error: {ex.Message}");
                Console.WriteLine($"💥 Stack trace: {ex.StackTrace}");
                throw;
            }
        }

        private string HashPassword(string password)
        {
            // استخدام BC للاشارة للكلاس الصحيح
            return BC.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hash)
        {
            try
            {
                Console.WriteLine("🔐 Verifying password...");
                Console.WriteLine($"🔐 Password provided: {(string.IsNullOrEmpty(password) ? "empty" : "provided")}");
                Console.WriteLine($"🔐 Hash provided: {(string.IsNullOrEmpty(hash) ? "empty" : "provided")}");
                
                var result = BC.Verify(password, hash);
                Console.WriteLine($"🔐 Password verification result: {result}");
                return result;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"💥 Password verification error: {ex.Message}");
                Console.WriteLine($"💥 Stack trace: {ex.StackTrace}");
                return false;
            }
        }
    }

    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class RegisterModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string FullName { get; set; }
        public string UserType { get; set; }
    }

    public class ChangePasswordModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }

    public class UpdateProfileModel
    {
        public string FullName { get; set; }
    }
}
