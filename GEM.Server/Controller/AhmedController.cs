using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class AhmedController : ControllerBase
    {
        private readonly MyDbContext _db;
        public AhmedController(MyDbContext db)
        {
            _db = db;
        }
        [HttpGet("GetAllUsers")]
        public IActionResult GetAllUser()
        {
            var data = _db.Users.ToList();
            return Ok(data);
        }
        [HttpPost("Register")]
        public IActionResult Register([FromForm] RegisterDTO register)
        {
            var check = _db.Users.FirstOrDefault(x => x.Email == register.Email);
            if (check != null)
            {
                return BadRequest("Email is Unique");
            }
            else
            {
                var data = new User
                {
                    FristName = register.FristName,
                    LastName = register.LastName,
                    Email = register.Email,
                    Password = register.Password,
                    PhoneNumber = register.PhoneNumber,
                };

                _db.Users.Add(data);
                _db.SaveChanges();

                var newCart = new Cart
                {
                    UserId = data.UserId
                };

                _db.Carts.Add(newCart);

                _db.SaveChanges();
                return Ok();

            }

        }
        [HttpPost("Login")]
        public IActionResult Login([FromForm] LoginDTO login)
        {
            var data = _db.Users.Where(x => x.Email == login.Email && x.Password == login.Password).FirstOrDefault();
            if (data == null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(data);
            }
        }
    }
}
