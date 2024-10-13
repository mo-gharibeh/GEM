using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GEM.Server.Models;
using GEM.Server.DTOs;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersBassamController : ControllerBase
    {
        private readonly MyDbContext _context;

        public UsersBassamController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [HttpGet("getImages/{image}")]
        public IActionResult getImage(string image)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", image);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();
        }


        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("edit-profile/{userId}")]
        public async Task<IActionResult> UpdateUserProfile(int userId, [FromForm] UserProfileUpdateDto userProfileUpdateDto)
        {
            if (userProfileUpdateDto == null)
            {
                return BadRequest("User profile data is null.");
            }

            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }

            // Update user properties
            if (!string.IsNullOrEmpty(userProfileUpdateDto.FirstName))
            {
                user.FristName = userProfileUpdateDto.FirstName;
            }
            if (!string.IsNullOrEmpty(userProfileUpdateDto.LastName))
            {
                user.LastName = userProfileUpdateDto.LastName;
            }
            if (!string.IsNullOrEmpty(userProfileUpdateDto.PhoneNumber))
            {
                user.PhoneNumber = userProfileUpdateDto.PhoneNumber;
            }
            if (!string.IsNullOrEmpty(userProfileUpdateDto.Address))
            {
                user.Address = userProfileUpdateDto.Address;
            }
            if (!string.IsNullOrEmpty(userProfileUpdateDto.Password))
            {
                // Consider hashing the password before saving it
                user.Password = userProfileUpdateDto.Password;
            }
            if (userProfileUpdateDto.Image != null && userProfileUpdateDto.Image.Length > 0)
            {


                var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                if (!Directory.Exists(folder))
                {

                    Directory.CreateDirectory(folder);
                }



                // Assuming you want to save the image file, you can implement the save logic here
                var filePath = Path.Combine(folder, userProfileUpdateDto.Image.FileName); // Define your upload path
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await userProfileUpdateDto.Image.CopyToAsync(stream); // Save the file to the server
                }

                // Set the user image path or filename as needed
                user.Image = userProfileUpdateDto.Image.FileName; // Or set the path if needed
            }

            _context.Users.Update(user);
            await _context.SaveChangesAsync();

            return NoContent(); // 204 No Content
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(UserDtoBassam userDto)
        {
            var user = new User
            {
                FristName = userDto.FirstName,
                LastName = userDto.LastName,
                Email = userDto.Email,
                Password = userDto.Password,
                Image = userDto.Image,
                PhoneNumber = userDto.PhoneNumber,
                Address = userDto.Address
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
    }
}
