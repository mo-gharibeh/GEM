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


        // For USer Subscription
        [HttpPost("AddGymSubscribtion")]
        public IActionResult AddSubscribtion(subscriptionGymDTO subscriptiongym)
        {
            var startDate = DateTime.Now;
            var endDate = startDate.AddMonths(1);
             var classSubscription = new ClassSubscription
            {
                ClassId = subscriptiongym.ClassSubId,
            };

            _db.ClassSubscriptions.Add(classSubscription);
            _db.SaveChanges();
            var subscription = new Enrolled
            {
                UserId = subscriptiongym.UserId,
                ClassSubId = classSubscription.Id,
                StartDate = startDate,
                EndDate = endDate,
                PaymentMethod = subscriptiongym.PaymentMethod,
            };

            _db.Enrolleds.Add(subscription);
            _db.SaveChanges();

            return Ok();
        }

        // Show The Subscription Page For Admin Side
        [HttpGet("GetClassSubscribtion")]
        public IActionResult GetClassSubscribtion()
        {
            var subscriptionGym = _db.ClassSubscriptions.ToList();
            return Ok(subscriptionGym);
        }


        // For USer Subscription
        [HttpPost("AddClassSubscribtion")]
        public IActionResult AddClassSubscribtion(subscriptionClassDTO subscriptionclass)
        {
            var startDate = DateTime.Now;
            var endDate = startDate.AddMonths(1);

            var subscription = new Enrolled
            {
                UserId = subscriptionclass.UserId,
                ClassSubId = subscriptionclass.ClassSubId,
                ClassTimeId = subscriptionclass.ClassTimeId,// This From ClassTime Table
                PaymentMethod = subscriptionclass.PaymentMethod,
            };

            _db.Enrolleds.Add(subscription);
            _db.SaveChanges();

            return Ok();
        }
    }
}