using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController1 : ControllerBase
    {
        private readonly MyDbContext _db;
        public CategoryController1(MyDbContext db)
        {
            _db = db;


        }

        [HttpGet("Category")]
        public IActionResult Category()
        {
            var category = _db.Categories.ToList();

            return Ok(category);

        }
    }
}
