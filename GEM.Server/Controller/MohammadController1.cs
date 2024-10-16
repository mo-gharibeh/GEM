using GEM.Server.DTOs;
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
        [HttpGet("VisibleTestimonials")]
        public IActionResult VisibleTestimonials()
        {
            var testimonials = _db.Testimonials.Where(t => t.Status == "Visible")
                .Select(t => new
                {
                    t.Testimonialid,
                    t.UserId,
                    UserName = t.User.FristName, // Assuming User entity has a FullName property
                    t.Status,
                    t.Text,
                    t.CreatedAt
                }).ToList();

            return Ok(testimonials);
        }
        [HttpGet("AllTestimonials")]
        public IActionResult AllTestimonials()
        {
            var testimonials = _db.Testimonials
                .Select(t => new
                {
                    t.Testimonialid,
                    t.UserId,
                    UserName = t.User.FristName, // Assuming User entity has a FullName property
                    t.Status,
                    t.Text,
                    t.CreatedAt
                })
                .ToList();

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

        // DELETE: api/Testimonials/Delete/{id}
        [HttpDelete("Delete/{id}")]
        public IActionResult Delete(int id)
        {
            var testimonialFromDb = _db.Testimonials.Find(id);
            if (testimonialFromDb == null)
            {
                return NotFound();
            }

            _db.Testimonials.Remove(testimonialFromDb);
            _db.SaveChanges();
            return NoContent(); // Return a 204 No Content response to indicate successful deletion
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
        // adding subMealPlan
        [HttpPost("add-sub-meal")]
        public IActionResult AddSubMeal([FromForm] addSubMealDto subMealDto)
        {
            if (subMealDto == null || subMealDto.MealPlanId == null)
            {
                return BadRequest(new { message = "Invalid input data." });
            }

            // Create a new SubMealPlan entity
            var newSubMeal = new SubMealPlan
            {
                SubMealPlanId = subMealDto.SubMealPlanId,
                Title = subMealDto.Title,
                Description = subMealDto.Description,
                PreparationTime = subMealDto.PreparationTime,
                Instructions = subMealDto.Instructions,
                FirstStepes = subMealDto.FirstStepes,
                SecondStepes = subMealDto.SecondStepes,
                FinalStepes = subMealDto.FinalStepes,
                MealPlanId = subMealDto.MealPlanId.Value
            };

            // Handle file upload for Image
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, subMealDto.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                subMealDto.Image.CopyToAsync(stream);

            }

            // Add the new SubMealPlan to the database
            _db.SubMealPlans.Add(newSubMeal);
            _db.SaveChanges();

            return Ok(new { message = "SubMealPlan added successfully.", SubMealPlanId = newSubMeal.SubMealPlanId });
        }

        // adding nutrition 
        [HttpPost("add-nutrition")]
        public IActionResult AddNutrition([FromForm] AddNutritionDto nutritionDto)
        {
            if (nutritionDto == null || nutritionDto.SubMealPlanId == null)
            {
                return BadRequest(new { message = "Invalid input data." });
            }

            // Create a new NutritionFact entity
            var newNutrition = new NutritionFact
            {
                SubMealPlans = nutritionDto.SubMealPlanId.Value,
                Calories = nutritionDto.Calories,
                TotalFat = nutritionDto.TotalFat,
                SaturatedFat = nutritionDto.SaturatedFat,
                Cholesterol = nutritionDto.Cholesterol,
                Sodium = nutritionDto.Sodium,
                Carbohydrates = nutritionDto.Carbohydrates,
                DietaryFiber = nutritionDto.DietaryFiber
            };

            // Add the new NutritionFact to the database
            _db.NutritionFacts.Add(newNutrition);
            _db.SaveChanges();

            return Ok(new { message = "Nutrition added successfully.", NutritionID = newNutrition.NutritionId });
        }





        // For Image

        [HttpGet("getImages/{imageName}")]
        public IActionResult getImage(string imageName)
        {

            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", imageName);
            if (System.IO.File.Exists(pathImage))
            {

                return PhysicalFile(pathImage, "image/jpeg");
            }
            return NotFound();

        }
        ///MEEEEEAAAALLL
        // Add new Meal
        [HttpPost("addMeal")]
        public IActionResult addMealPlan([FromForm] MealPlanDto addMeal)
        {

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, addMeal.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                addMeal.Image.CopyToAsync(stream);

            }

            var newMeal = new MealPlan
            {
                MealPlanId = addMeal.MealPlanId,
                Title = addMeal.Title,
                Image = addMeal.Image.FileName,
                Description = addMeal.Description,

            };

            _db.MealPlans.Add(newMeal);
            _db.SaveChanges();
            return Ok(newMeal);
        }

        [HttpPut("editMeal/{id}")]
        public IActionResult EditMealPlan(int id, [FromForm] MealPlanDto editMeal)
        {
            var existingMeal = _db.MealPlans.Find(id);
            if (existingMeal == null)
            {
                return NotFound("Meal not found.");
            }

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            // Check if a new image file was uploaded
            if (editMeal.Image != null)
            {
                var fileImage = Path.Combine(folder, editMeal.Image.FileName);
                using (var stream = new FileStream(fileImage, FileMode.Create))
                {
                    editMeal.Image.CopyToAsync(stream);
                }
                existingMeal.Image = editMeal.Image.FileName; // Update image
            }

            // Update other fields
            existingMeal.Title = editMeal.Title;
            existingMeal.Description = editMeal.Description;

            _db.SaveChanges();
            return Ok(existingMeal);
        }


        [HttpDelete("deleteMeal/{id}")]
        public IActionResult DeleteMealPlan(int id)
        {
            var existingMeal = _db.MealPlans.Find(id);
            if (existingMeal == null)
            {
                return NotFound("Meal not found.");
            }

            // Delete the image file if it exists
            //var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            //var fileImage = Path.Combine(folder, existingMeal.Image);
            //if (System.IO.File.Exists(fileImage))
            //{
            //    System.IO.File.Delete(fileImage);
            //}

            _db.MealPlans.Remove(existingMeal);
            _db.SaveChanges();
            return Ok("Meal deleted successfully.");
        }

        ///subMeal 


        [HttpGet("getAllSubMeals")]
        public IActionResult GetAllSubMeals()
        {
            var subMeals = _db.SubMealPlans.ToList();
            return Ok(subMeals);
        }


        [HttpGet("getSubMeal/{id}")]
        public IActionResult GetSubMeal(int id)
        {
            var subMeal = _db.SubMealPlans.FirstOrDefault(s => s.SubMealPlanId == id);
            if (subMeal == null)
            {
                return NotFound("Sub-Meal not found.");
            }
            return Ok(subMeal);
        }


        // Add new SubMeal
        [HttpPost("addSubMeal")]
        public IActionResult addSubMeal([FromForm] addSubMealDto addSubMeal)
        {

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, addSubMeal.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                addSubMeal.Image.CopyToAsync(stream);

            }

            var newSubMeal = new SubMealPlan
            {
                Title = addSubMeal.Title,
                Image = addSubMeal.Image.FileName,
                Description = addSubMeal.Description,
                PreparationTime = addSubMeal.PreparationTime,
                Instructions = addSubMeal.Instructions,
                FirstStepes = addSubMeal.FirstStepes,
                SecondStepes = addSubMeal.SecondStepes,
                FinalStepes = addSubMeal.FinalStepes,
                MealPlanId = addSubMeal.MealPlanId,
            };

            _db.SubMealPlans.Add(newSubMeal);
            _db.SaveChanges();
            return Ok(newSubMeal);
        }

        [HttpPut("editSubMeal/{id}")]
        public IActionResult EditSubMeal(int id, [FromForm] addSubMealDto editSubMeal)
        {
            var existingSubMeal = _db.SubMealPlans.Find(id);
            if (existingSubMeal == null)
            {
                return NotFound("SubMeal not found.");
            }

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            // Check if a new image file was uploaded
            if (editSubMeal.Image != null)
            {
                var fileImage = Path.Combine(folder, editSubMeal.Image.FileName);
                using (var stream = new FileStream(fileImage, FileMode.Create))
                {
                    editSubMeal.Image.CopyToAsync(stream);
                }
                existingSubMeal.Image = editSubMeal.Image.FileName; // Update image
            }

            // Update other fields
            existingSubMeal.Title = editSubMeal.Title;
            existingSubMeal.Description = editSubMeal.Description;
            existingSubMeal.PreparationTime = editSubMeal.PreparationTime;
            existingSubMeal.Instructions = editSubMeal.Instructions;
            existingSubMeal.FirstStepes = editSubMeal.FirstStepes;
            existingSubMeal.SecondStepes = editSubMeal.SecondStepes;
            existingSubMeal.FinalStepes = editSubMeal.FinalStepes;
            existingSubMeal.MealPlanId = editSubMeal.MealPlanId;

            _db.SaveChanges();
            return Ok(existingSubMeal);
        }


        [HttpDelete("deleteSubMeal/{id}")]
        public IActionResult DeleteSubMeal(int id)
        {
            var existingSubMeal = _db.SubMealPlans.Find(id);
            if (existingSubMeal == null)
            {
                return NotFound("SubMeal not found.");
            }

            // Delete the image file if it exists
            //var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            //var fileImage = Path.Combine(folder, existingSubMeal.Image);
            //if (System.IO.File.Exists(fileImage))
            //{
            //    System.IO.File.Delete(fileImage);
            //}

            _db.SubMealPlans.Remove(existingSubMeal);
            _db.SaveChanges();
            return Ok("SubMeal deleted successfully.");
        }



    }

}
