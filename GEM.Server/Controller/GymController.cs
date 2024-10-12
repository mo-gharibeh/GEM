using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymController : ControllerBase
    {
        private readonly MyDbContext _db;
        public GymController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("ShowAllGyms")]
        public IActionResult GetAllGyms()
        {
            var gym = _db.ClassAndGyms.Where(x => x.Flag == true).ToList();
            return Ok(gym);
        }

        [HttpGet("ShowGymDetails/{id}")]
        public IActionResult GymDetails(int id)
        {
            var gymdetails = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);
            return Ok(gymdetails);
        }


        // For Admin Side To Add Gym
        [HttpPost("AddGym")]
        public IActionResult AddGym(GymDTO gymdto)
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(folder))
            {

                Directory.CreateDirectory(folder);
            }

            var fileImage = Path.Combine(folder, gymdto.Image.FileName);

            using (var stream = new FileStream(fileImage, FileMode.Create))
            {

                gymdto.Image.CopyToAsync(stream);

            }

            var gym = new ClassAndGym
            {
                Name = gymdto.Name,
                Description = gymdto.Description,
                Price = gymdto.Price,
                Flag = true,
                Image = gymdto.Image.FileName,
            };

            _db.ClassAndGyms.Add(gym);
            _db.SaveChanges();
            return Ok();
        }


        // For Admin Side To Edit Gym
        [HttpPut("EditGym")]
        public IActionResult editGym(int id, [FromForm] GymDTO gymDTO)
        {
            var gym = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(folder))
            {

                Directory.CreateDirectory(folder);
            }

            var fileImage = Path.Combine(folder, gymDTO.Image.FileName);

            using (var stream = new FileStream(fileImage, FileMode.Create))
            {

                gymDTO.Image.CopyToAsync(stream);

            }

            gym.Name = gymDTO.Name;
            gym.Description = gymDTO.Description;
            gym.Image = gymDTO.Image.FileName;
            gym.Price = gymDTO.Price;

            _db.ClassAndGyms.Update(gym);
            _db.SaveChanges();
            return Ok();
        }


        // For Admin Side To Delete Gym
        [HttpDelete("DeleteGym")]
        public IActionResult deleteGym(int id)
        {

            var gym = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);

            if (gym == null)
            {
                return BadRequest();
            }

            _db.ClassAndGyms.Remove(gym);
            _db.SaveChanges();
            return Ok();
        }
    }
}
