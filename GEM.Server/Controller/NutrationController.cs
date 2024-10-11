using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class NutrationController : ControllerBase
    {
        private readonly MyDbContext _db;
        public NutrationController(MyDbContext db)
        {
            _db = db;


        }


        [HttpGet("Meal")]
        public IActionResult Food()
        {
            var food = _db.MealPlans.ToList();
            return Ok(food);
        }

        [HttpGet("SubMeal/{id}")]
        public IActionResult SubFood(int id)
        {
            var SubFood = _db.SubMealPlans.Where(a => a.MealPlanId == id).ToList();
            return Ok(SubFood);
        }


        [HttpGet("Tips")]
        public IActionResult Tips()
        {
            var Tips = _db.Tips.ToList();
            return Ok(Tips);
        }


        
      
    }
}