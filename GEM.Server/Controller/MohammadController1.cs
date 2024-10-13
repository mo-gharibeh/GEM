using GEM.Server.DTOs.MohammadDTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MohammadController1 : ControllerBase
    {
        private readonly MyDbContext _db;
        public MohammadController1(MyDbContext db)
        {
            _db = db;
        }

        // get all testimonials when status is Visible 
        [HttpGet("Testimonials")]
        public IActionResult Testimonials()
        {
            var testimonials = _db.Testimonials.Where(t => t.Status == "Visible").ToList();
            return Ok(testimonials);
        }

        // change status of testimonials to Visible or hidden
        [HttpPut("ChangeStatus/{id}")]
        public IActionResult ChangeStatus(int id)
        {
            var testimonialFromDb = _db.Testimonials.Find(id);
            if (testimonialFromDb == null)
            {
                return NotFound();
            }
            if (testimonialFromDb.Status == "Hidden")
            {
                testimonialFromDb.Status = "Visible";
            }
            else
            {
                testimonialFromDb.Status = "Hidden";
            }
            _db.SaveChanges();
            return Ok(testimonialFromDb);

        }

        // show the top four best selling products list 

        // GET: api/Products/TopSelling
        [HttpGet("top-products")]
        public IActionResult GetTopSellingProducts()
        {
            var topProducts = (from o in _db.OrderItems
                               join p in _db.Products on o.ProductId equals p.ProductId
                               group o by new { p.ProductId, p.ProductName, p.Image, p.Description, p.Price } into g
                               orderby g.Sum(x => x.Quantity) descending
                               select new TopSellingProductDto
                               {
                                   ProductID = g.Key.ProductId,
                                   ProductName = g.Key.ProductName,
                                   Image = g.Key.Image,
                                   Description = g.Key.Description,
                                   Price = g.Key.Price ?? 0m,
                                   TotalSold = g.Sum(x => x.Quantity ?? 0)
                               }).Take(4).ToList();

            return Ok(topProducts);
        }

        [HttpPost("SubmitTestimonial")]
        public IActionResult SubmitTestimonial([FromBody] TestimonialDto testimonialDto)
        {
            if (testimonialDto == null || string.IsNullOrWhiteSpace(testimonialDto.Text))
            {
                return BadRequest("Invalid testimonial data.");
            }

            var newTestimonial = new Testimonial
            {
                UserId = testimonialDto.UserId,
                Text = testimonialDto.Text,
                TestimonialSubmit = true,
            };

            // Save the testimonial to the database
            _db.Testimonials.Add(newTestimonial);
            _db.SaveChanges();

            return Ok("Testimonial submitted successfully.");
        }


        [HttpGet("CheckSubscriptionAndPromptTestimonial/{userId}")]
        public IActionResult CheckSubscriptionAndPromptTestimonial(int userId)
        {
            // الحصول على الاشتراك الخاص بالمستخدم
            var userSubscription = _db.Enrolleds
                .Where(e => e.UserId == userId)
                .OrderByDescending(e => e.EndDate)
                .FirstOrDefault();

            // التحقق إذا كان الاشتراك موجودًا
            if (userSubscription != null)
            {
                // حساب الأيام المتبقية لانتهاء الاشتراك
                var daysRemaining = (userSubscription.EndDate - DateTime.Now)?.TotalDays ?? 0;

                // إذا كانت الأيام المتبقية أقل من أو تساوي 7 أيام أو الاشتراك منتهي
                if (daysRemaining <= 7)
                {
                    // التحقق إذا كان المستخدم قد كتب رأيًا من قبل
                    var hasSubmittedTestimonial = _db.Testimonials
                        .Any(t => t.UserId == userId && t.TestimonialSubmit == true);

                    // إذا لم يكتب رأيًا من قبل
                    if (!hasSubmittedTestimonial)
                    {
                        // يمكن هنا إظهار نافذة الـ testimonial للمستخدم
                        return Ok(new { showTestimonialPrompt = true });
                    }
                }
            }

            // إذا لم يكن هناك داعٍ لإظهار نافذة الـ testimonial
            return Ok(new { showTestimonialPrompt = false });
        }

        // get all nutrations
        [HttpGet("{subMealPlanId}")]
        public IActionResult GetSubMealPlanWithNutrition(int subMealPlanId)
        {
            // Get the SubMealPlan with its associated NutritionFacts
            var subMealPlan = _db.SubMealPlans
                .Where(s => s.SubMealPlanId == subMealPlanId)
                .Select(s => new SubMealPlanDto
                {
                    SubMealPlanID = s.SubMealPlanId,
                    Title = s.Title,
                    Image = s.Image,
                    Description = s.Description,
                    PreparationTime = s.PreparationTime,
                    Instructions = s.Instructions,
                    FirstStepes = s.FirstStepes,
                    SecondStepes = s.SecondStepes,
                    FinalStepes = s.FinalStepes,
                    MealPlanID = s.MealPlanId,
                    NutritionFacts = _db.NutritionFacts
                        .Where(n => n.SubMealPlans == s.SubMealPlanId)
                        .Select(n => new NutritionFactDto
                        {
                            NutritionID = n.NutritionId,
                            Calories = n.Calories,
                            TotalFat = n.TotalFat,
                            SaturatedFat = n.SaturatedFat,
                            Cholesterol = n.Cholesterol,
                            Sodium = n.Sodium,
                            Carbohydrates = n.Carbohydrates,
                            DietaryFiber = n.DietaryFiber,
                            Sugars = n.Sugars,
                            Protein = n.Protein,
                            VitaminD = n.VitaminD,
                            Calcium = n.Calcium,
                            Iron = n.Iron,
                            Potassium = n.Potassium
                        }).ToList()
                })
                .FirstOrDefault();

            if (subMealPlan == null)
            {
                return NotFound(new { message = "SubMealPlan not found." });
            }

            return Ok(subMealPlan);
        }

    }
    
}
