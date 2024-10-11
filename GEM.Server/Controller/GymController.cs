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

        [HttpGet("ShowGymDetails")]
        public IActionResult GymDetails(int id)
        {
            var gymdetails = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);
            return Ok(gymdetails);
        }

        [HttpPost("AddGym")]
        public IActionResult AddGym()
        {


            return Ok();
        }
    }
}
