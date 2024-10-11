using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscribtionController : ControllerBase
    {
        private readonly MyDbContext _db;
        public SubscribtionController(MyDbContext db)
        {
            _db = db;
        }

        // Show The Subscription Page For Admin Side
        [HttpGet("GetAllSubscribtion")]
        public IActionResult GetSubscribtion() 
        {
            var subscriptionGym = _db.ClassSubscriptions.ToList();
            return Ok(subscriptionGym);
        }



        [HttpPost("AddGymSubscribtion")]
        public IActionResult AddSubscribtion(subscriptionGymDTO subscriptiongym)
        {
            var startDate = DateTime.Now;
            var  endDate = startDate.AddMonths(1);

            var subscription = new Enrolled
            {
                UserId = subscriptiongym.UserId,
                ClassSubId = subscriptiongym.ClassSubId,
                StartDate = startDate,
                EndDate = endDate,
                PaymentMethod = subscriptiongym.PaymentMethod,
            };

            _db.Enrolleds.Add(subscription);
            _db.SaveChanges();

            return Ok();
        }
    }
}