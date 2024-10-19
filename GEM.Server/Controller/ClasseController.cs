using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClasseController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ClasseController(MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllClasses")]
        public IActionResult GetAllClasses()
        {
            var classe = _db.ClassAndGyms.Where(x => x.Flag == false).ToList();
            return Ok(classe);
        }

        [HttpGet("GetClasseDetails/{id}")]
        public IActionResult GetClasses(int id)
        {
            var classe = _db.ClassAndGyms.Where(x => x.Id == id && x.Flag == false).FirstOrDefault();
            return Ok(classe);
        }
        // New API: Fetch times for a specific class by class ID
        [HttpGet("{classId}/times")]
        public IActionResult GetClassTimes(int classId)
        {
            // Fetch class and its associated times
            var classTimes = _db.ClassTimes
                                           .Where(ct => ct.ClassId == classId)
                                           .Select(ct => new
                                           {
                                               ct.Id,
                                               ct.StartTime,
                                               ct.EndTime
                                           })
                                           .ToList();

            // Check if any times are found
            if (classTimes == null)
            {
                return NotFound(new { message = "No times found for this class." });
            }

            return Ok(classTimes);
        }


        // POST: api/class/{classId}/join
        [HttpPost("{classId}/join")]
        [Authorize] // Ensures that only logged-in users can join
        public IActionResult JoinClass(int classId, [FromBody] JoinClassRequest request)
        {
            // 1. Check if the user is logged in
            var userId = User.Claims.FirstOrDefault(c => c.Type == "UserID")?.Value;
            if (userId == null)
            {
                return Unauthorized(new { message = "User not logged in." });
            }

            // 2. Validate the selected class time
            var classTime = _db.ClassTimes.Find(request.ClassTimeId);
            if (classTime == null || classTime.ClassId != classId)
            {
                return BadRequest(new { message = "Invalid class time selection." });
            }

            // 3. Ensure payment is successful (simplified payment check)
            if (!request.PaymentSuccessful)
            {
                return BadRequest(new { message = "Payment not successful." });
            }

            // 4. Add the enrollment to the Enrolled table
            var enrollment = new Enrolled
            {
                UserId = int.Parse(userId), // Logged-in user's ID
                ClassSubId = request.ClassSubId,
                ClassTimeId = request.ClassTimeId,
                StartDate = classTime.StartTime ?? DateTime.Now, // Using class time start as enrollment start
                EndDate = classTime.EndTime ?? DateTime.Now.AddMonths(1), // Dummy end date, adjust as needed
                PaymentMethod = request.PaymentMethod
            };

            _db.Enrolleds.Add(enrollment);
            _db.SaveChanges();

            return Ok(new { message = "Successfully joined the class." });
        }


        // For Admin Side To Add Gym
        [HttpPost("Addclass")]
        public IActionResult Addclass(ClasseDTO classedto)
        {
            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

            if (!Directory.Exists(folder))
            {

                Directory.CreateDirectory(folder);
            }

            var fileImage = Path.Combine(folder, classedto.Image.FileName);

            using (var stream = new FileStream(fileImage, FileMode.Create))
            {

                classedto.Image.CopyToAsync(stream);

            }

            var classe = new ClassAndGym
            {
                Name = classedto.Name,
                Description = classedto.Description,
                Price = classedto.Price,
                Flag = false,
                Image = classedto.Image.FileName,
                Trainer = classedto.Trainer,

            };

            _db.ClassAndGyms.Add(classe);
            _db.SaveChanges();


            if (classedto.dTO != null)
            {
                var classTime = new ClassTime
                {
                    ClassId = classe.Id,  // Assuming `Id` is generated after saving class
                    StartTime = classedto.dTO.StartTime,
                    EndTime = classedto.dTO.EndTime
                };

                _db.ClassTimes.Add(classTime);
                _db.SaveChanges();
            }


            return Ok();
        }


        [HttpPut("EditClass")]
        public IActionResult editClass(int id, [FromForm] ClasseDTO classedto)
        {
            var classe = _db.ClassAndGyms.Where(x => x.Id == id).FirstOrDefault();

            if (classedto.Image != null)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

                if (!Directory.Exists(folder))
                {

                    Directory.CreateDirectory(folder);
                }

                var fileImage = Path.Combine(folder, classedto.Image.FileName);

                using (var stream = new FileStream(fileImage, FileMode.Create))
                {

                    classedto.Image.CopyToAsync(stream);

                }
                classe.Image = classedto.Image.FileName;

            }

            classe.Name = classedto.Name ?? classe.Name;
            classe.Description = classedto.Description ?? classe.Description;
            classe.Price = classedto.Price ?? classe.Price;
            classe.Trainer = classedto.Trainer ?? classe.Trainer;

            _db.ClassAndGyms.Update(classe);
            _db.SaveChanges();
            return Ok();
        }


        // For Admin Side To Delete Gym
        [HttpDelete("DeleteClass")]
        public IActionResult deleteClass(int id)
        {
            var classe = _db.ClassAndGyms.FirstOrDefault(x => x.Id == id);

            if (classe == null)
            {
                return BadRequest();
            }

            // Get the related ClassTime records
            var classTimes = _db.ClassTimes.Where(ct => ct.ClassId == id).ToList();

            foreach (var classTime in classTimes)
            {
                // Get the related Enrolled records for each ClassTime
                var enrolleds = _db.Enrolleds.Where(e => e.ClassTimeId == classTime.Id).ToList();

                // Remove related Enrolled records
                _db.Enrolleds.RemoveRange(enrolleds);

                // Get the related ClassSubscription records for each ClassTime
                var subscriptions = _db.ClassSubscriptions.Where(cs => cs.ClassId == classTime.Id).ToList();

                // Remove related ClassSubscription records
                _db.ClassSubscriptions.RemoveRange(subscriptions);
            }

            // Remove related ClassTime records
            _db.ClassTimes.RemoveRange(classTimes);

            // Now remove the ClassAndGyms record
            _db.ClassAndGyms.Remove(classe);

            // Save changes to the database
            try
            {
                _db.SaveChanges();
                return Ok();
            }
            catch (DbUpdateException ex)
            {
                // Log the error (ex)
                return StatusCode(500, "Internal server error: " + ex.Message);
            }
        }



        // For Image

        [HttpGet("getImages/{image}")]
        public IActionResult getImage(string image)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", image);

            if (System.IO.File.Exists(pathImage))
            {
                return PhysicalFile(pathImage, "image/*");
            }

            return NotFound();
        }


    }
}
