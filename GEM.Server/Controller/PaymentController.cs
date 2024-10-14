using GEM.Server.DTOs;
using GEM.Server.Models;
using GEM.Server.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly PayPalPaymentService _payPalPaymentService;

        public PaymentController(MyDbContext db, PayPalPaymentService payPalPaymentService)
        {
            _db = db;
            _payPalPaymentService = payPalPaymentService;
        }

        // New endpoint: Create an enrollment for a class
        [HttpPost("CreateClassEnrollment/{userId}/{classId}/{classTimeId}")]
        public IActionResult CreateClassEnrollment(int userId, int classId, int classTimeId, decimal totalAmount)
        {
            try
            {
                var enrollment = CreateNewClassEnrollment(userId, classId, classTimeId, totalAmount);
                return Ok(new { message = "Class enrollment created successfully.", enrollmentId = enrollment.Id });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating class enrollment: {ex.Message}");
            }
        }

        // PayPal checkout for joining a class
        [HttpPost("CheckoutWithPayPal/{userId}/{classId}/{classTimeId}")]
        public IActionResult CheckoutWithPayPal(int userId, int classId, int classTimeId, [FromBody] PaymentDTO paymentInfo)
        {
            var classDetails = _db.ClassAndGyms.FirstOrDefault(c => c.Id == classId);
            if (classDetails == null) return BadRequest("Class not found.");

            var classTime = _db.ClassTimes.FirstOrDefault(ct => ct.Id == classTimeId && ct.ClassId == classId);
            if (classTime == null) return BadRequest("Class time not found.");

            // Assume `totalAmount` comes from class pricing logic
            var totalAmount = classDetails.Price ?? 0;

            var returnUrl = paymentInfo.ReturnUrl;
            var cancelUrl = paymentInfo.CancelUrl;
            var createdPayment = _payPalPaymentService.CreatePayment(totalAmount, returnUrl, cancelUrl);

            var approvalUrl = createdPayment.links.FirstOrDefault(l => l.rel == "approval_url")?.href;
            if (approvalUrl == null) return BadRequest("Failed to generate PayPal payment.");
            return Ok(new { approvalUrl });
        }

        // Execute PayPal payment and enroll user in the class
        [HttpPost("ExecutePayPalPayment")]
        public IActionResult ExecutePayPalPayment([FromBody] PayPalExecutionDTORama executionInfo)
        {
            try
            {
                var executedPayment = _payPalPaymentService.ExecutePayment(executionInfo.PaymentId, executionInfo.PayerId);

                if (executedPayment.state.ToLower() != "approved") return BadRequest("Payment not approved.");

                var totalAmount = decimal.Parse(executedPayment.transactions.First().amount.total);
                var enrollment = CreateNewClassEnrollment(executionInfo.UserId, executionInfo.ClassId, executionInfo.ClassTimeId, totalAmount);
                AddPaymentRecord(enrollment.Id, totalAmount, "PayPal");

                return Ok(new { message = "Payment successful. You have been enrolled in the class.", enrollmentId = enrollment.Id });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error executing PayPal payment: {ex.Message}");
            }
        }

        // Private method to create a new class enrollment (replaces Order creation)
        private Enrolled CreateNewClassEnrollment(int userId, int classId, int classTimeId, decimal totalAmount)
        {
            // First, find or create a ClassSubscription record for the user
            var classSubscription = _db.ClassSubscriptions.FirstOrDefault(cs => cs.ClassId == classId);

            // If no existing subscription is found, create one
            if (classSubscription == null)
            {
                classSubscription = new ClassSubscription
                {
                    ClassId = classId,            // Link to the class
                    FinalPrice = totalAmount      // Store the final price paid
                };

                // Add the new ClassSubscription to the database
                _db.ClassSubscriptions.Add(classSubscription);
                _db.SaveChanges();  // Save to get the new subscription ID
            }

            // Create the enrollment record for the user
            var enrollment = new Enrolled
            {
                UserId = userId,
                ClassSubId = classSubscription.Id,  // Use the subscription ID
                ClassTimeId = classTimeId,
                StartDate = DateTime.UtcNow,        // Start date is the current date
                EndDate = DateTime.UtcNow.AddMonths(1),  // Example end date (1 month later)
                PaymentMethod = "PayPal"
            };

            // Add the new enrollment record to the database
            _db.Enrolleds.Add(enrollment);
            _db.SaveChanges();  // Save the enrollment record

            return enrollment;
        }

        // Private method to add a payment record for the enrollment
        private void AddPaymentRecord(int enrollmentId, decimal amount, string paymentMethod)
        {
            var payment = new Models.PaymentRama
            {
                EnrollmentId = enrollmentId, // Changed to EnrollmentId instead of OrderId
                Amount = amount,
                PaymentMethod = paymentMethod,
                PaymentDate = DateTime.UtcNow,
                Status = "Success",
                PaymentGateway = paymentMethod
            };

            _db.PaymentRamas.Add(payment);
            _db.SaveChanges();
        }

    }
}

