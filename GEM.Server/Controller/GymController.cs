using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;


namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class GymController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IConfiguration _configuration; // Add this line
        private readonly PaymentServiceH _paymentService;
        public GymController(MyDbContext db, IConfiguration configuration, PaymentServiceH paymentService)
        {
            _db = db;
            _configuration = configuration;
            _paymentService = paymentService;
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
                Trainer = gymdto.Trainer,
                Flag = true,
                Image = gymdto.Image.FileName,
            };

            _db.ClassAndGyms.Add(gym);
            _db.SaveChanges();
            return Ok();
        }



        [HttpPut("EditGym")]
        public IActionResult EditGym(int id, [FromForm] GymDTO gymDTO)
        {
            // Check if the gym with the provided id exists
            var gym = _db.ClassAndGyms.Where(x => x.Id == id).FirstOrDefault();

            if (gym == null)
            {
                return NotFound(new { message = "Gym not found" });
            }

            // Handle the case when gymDTO.Image is null
            if (gymDTO.Image != null)
            {
                var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
                if (!Directory.Exists(folder))
                {
                    Directory.CreateDirectory(folder);
                }

                var fileImage = Path.Combine(folder, gymDTO.Image.FileName);
                using (var stream = new FileStream(fileImage, FileMode.Create))
                {
                    gymDTO.Image.CopyTo(stream);
                }

                // Only update the image if a new image is provided
                gym.Image = gymDTO.Image.FileName;
            }

            // Update the rest of the gym details
            gym.Name = gymDTO.Name ?? gym.Name;
            gym.Description = gymDTO.Description ?? gym.Description;
            gym.Price = gymDTO.Price ?? gym.Price;

            // Save changes to the database
            _db.ClassAndGyms.Update(gym);
            _db.SaveChanges();

            return Ok(new { message = "Gym updated successfully" });
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

            // Remove the ClassAndGyms record
            _db.ClassAndGyms.Remove(gym);

            // Save changes to the database
            _db.SaveChanges();

            return Ok();
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



        /// For PayMent
        /// 


        [HttpPost]
        [Route("checkoutForSubscription")]
        public async Task<IActionResult> CheckoutForSubscription([FromBody] PaymentHadeelDto paymentRequest)
        {
            if (paymentRequest == null)
            {
                return BadRequest("Invalid request.");
            }

            try
            {
                // Initialize Stripe with the secret key
                StripeConfiguration.ApiKey = _configuration["Stripe:SecretKey"];

                // Create a payment intent
                var options = new PaymentIntentCreateOptions
                {
                    Amount = (long)(paymentRequest.Amount * 100), // Amount in cents
                    Currency = "usd", // Change this to your desired currency
                    PaymentMethod = paymentRequest.PaymentToken, // Token received from Stripe.js
                    Confirm = true,
                };
                var service = new PaymentIntentService();
                PaymentIntent intent = service.Create(options);

                // Prepare the payment information for saving to the database
                var paymentHadeel = new PaymentHadeel
                {
                    UserId = paymentRequest.UserId,
                    ClassSubId = paymentRequest.ClassSubId,
                    ClassTimeId = paymentRequest.ClassTimeId,
                    PaymentToken = paymentRequest.PaymentToken,
                    Amount = paymentRequest.Amount,
                    FirstName = paymentRequest.FirstName,
                    LastName = paymentRequest.LastName,
                    CompanyName = paymentRequest.CompanyName,
                    Address = paymentRequest.Address,
                    Email = paymentRequest.Email,
                    Phone = paymentRequest.Phone
                };

                await _db.PaymentHadeels.AddAsync(paymentHadeel);
                await _db.SaveChangesAsync();  // Save changes to the database

                return Ok("Payment processed successfully.");
            }
            catch (StripeException stripeEx)
            {
                // Handle Stripe-specific exceptions
                return BadRequest($"Payment error: {stripeEx.Message}");
            }
            catch (Exception ex)
            {
                // Log the error and return a failure response
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        //[HttpPost("checkoutForSubscription")]
        //public async Task<IActionResult> CreatePayment([FromBody] PaymentRequestHDTO paymentRequest)
        //{
        //    var existingEnrollment = await _db.Enrolleds
        //        .Where(u => u.UserId == paymentRequest.UserId && u.ClassSubId == paymentRequest.ClassSubId)
        //        .FirstOrDefaultAsync();

        //    if (existingEnrollment != null)
        //    {
        //        return BadRequest("You are already subscribed to this class.");
        //    }

        //    var options = new ChargeCreateOptions
        //    {
        //        Amount = (long)(paymentRequest.Amount * 100),
        //        Currency = "usd",
        //        Description = "Class Subscription Payment",
        //        Source = paymentRequest.PaymentToken,
        //    };

        //    var service = new ChargeService();
        //    try
        //    {
        //        Charge charge = service.Create(options);

        //        if (charge.Status == "succeeded")
        //        {
        //            var newEnrollment = new Enrolled
        //            {
        //                UserId = paymentRequest.UserId,
        //                ClassSubId = paymentRequest.ClassSubId,
        //                ClassTimeId = paymentRequest.ClassTimeId,
        //                StartDate = DateTime.Now,
        //                EndDate = DateTime.Now.AddMonths(1),
        //                PaymentMethod = "Stripe"
        //            };

        //            _db.Enrolleds.Add(newEnrollment);
        //            await _db.SaveChangesAsync();

        //            return Ok(new { Message = "Payment and enrollment successful." });
        //        }
        //        else
        //        {
        //            return BadRequest("Payment failed.");
        //        }
        //    }
        //    catch (StripeException ex)
        //    {
        //        return BadRequest($"Payment error: {ex.Message}");
        //    }
        //}

        //[HttpGet("GetAllEnrollments")]
        //public async Task<IActionResult> GetAllEnrollments()
        //{
        //    var enrollments = await _db.Enrolleds
        //        .Include(e => e.User)
        //        .Include(e => e.ClassSub)
        //        .ToListAsync();

        //    return Ok(enrollments);
        //}

        //[HttpGet("GetEnrollmentDetails/{id}")]
        //public async Task<IActionResult> GetEnrollmentDetails(int id)
        //{
        //    var enrollment = await _db.Enrolleds
        //        .Include(e => e.User)
        //        .Include(e => e.ClassSub)
        //        .FirstOrDefaultAsync(e => e.Id == id);

        //    if (enrollment == null)
        //    {
        //        return NotFound("Enrollment not found.");
        //    }

        //    return Ok(enrollment);
        //}

        //[HttpPut("EditEnrollment/{id}")]
        //public async Task<IActionResult> EditEnrollment(int id, [FromBody] Enrolled updatedEnrollment)
        //{
        //    var enrollment = await _db.Enrolleds.FindAsync(id);

        //    if (enrollment == null)
        //    {
        //        return NotFound("Enrollment not found.");
        //    }

        //    enrollment.ClassSubId = updatedEnrollment.ClassSubId;
        //    enrollment.ClassTimeId = updatedEnrollment.ClassTimeId;
        //    enrollment.EndDate = updatedEnrollment.EndDate;
        //    enrollment.PaymentMethod = updatedEnrollment.PaymentMethod;

        //    _db.Enrolleds.Update(enrollment);
        //    await _db.SaveChangesAsync();

        //    return Ok("Enrollment updated successfully.");
        //}

        //[HttpDelete("DeleteEnrollment/{id}")]
        //public async Task<IActionResult> DeleteEnrollment(int id)
        //{
        //    var enrollment = await _db.Enrolleds.FindAsync(id);

        //    if (enrollment == null)
        //    {
        //        return NotFound("Enrollment not found.");
        //    }

        //    _db.Enrolleds.Remove(enrollment);
        //    await _db.SaveChangesAsync();

        //    return Ok("Enrollment deleted successfully.");
        //}


        //[HttpPost("checkout")]
        //public IActionResult CreatePayment([FromBody] PayRDTO payRDTO)
        //{
        //    if (string.IsNullOrEmpty(_redirectUrl))
        //        throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");


        //    var totalPrice = _db.ClassServices.Where(x => x.Id == payRDTO.idSubs).FirstOrDefault().PricePerMonth ?? 0;

        //    var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, payRDTO.userID, payRDTO.idSubs);
        //    var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

        //    return Ok(new { approvalUrl });
        //}

        //[HttpGet("success")]
        //public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userID, long subsId)
        //{



        //    var subscription = new ClassSubscription()
        //    {
        //        ClassServiceId = subsId,
        //        StartDate = DateTime.Now,
        //        EndDate = DateTime.Now.AddMonths(1),
        //        UserId = userID,
        //        //PaymentId = paymentId
        //    };

        //    _db.ClassSubscriptions.Add(subscription);
        //    _db.SaveChanges();




        //    var executedPayment = payPalService.ExecutePayment(paymentId, PayerID, userID, subsId);
        //    const string script = "<script>window.close();</script>";
        //    return Content(script, "text/html");



        //}


        //[HttpGet("cancel")]
        //public IActionResult CancelPayment()
        //{
        //    return BadRequest("Payment canceled.");
        //}

    }
}
