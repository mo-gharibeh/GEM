using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly MyDbContext _db;

        public ValuesController(MyDbContext db)
        {
            _db = db;   
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = _db.Users.FirstOrDefault();
            return Ok(user);
        }
    }
}
