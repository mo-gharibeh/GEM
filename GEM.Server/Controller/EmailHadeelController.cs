
        using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
    {
        [Route("api/[controller]")]
        [ApiController]
        public class EmailHadeelController : ControllerBase
        {

            private readonly MyDbContext _db;
            private readonly EmailServiceH _emailServiceH;
            private readonly IConfiguration _configuration;
            public EmailHadeelController(MyDbContext db, EmailServiceH emailServiceH, IConfiguration configuration)
            {
                _db = db;
                _emailServiceH = emailServiceH;
                _configuration = configuration;
            }

            //  For Email

            [HttpPost("send-reminder-emails")]
            public async Task<IActionResult> SendReminderEmailsAsync()
            {
                var currentDate = DateTime.Now;
                var reminderDate = currentDate.AddDays(5).Date;

                var subscriptions = await _db.Enrolleds
                    .Where(sub => sub.EndDate.HasValue && sub.EndDate.Value.Date == reminderDate)
                    .Include(sub => sub.User)
                    .ToListAsync();

                if (!subscriptions.Any())
                {
                    return Ok("No subscriptions ending in 5 days.");
                }

                foreach (var subscription in subscriptions)
                {
                    if (subscription.User != null && !string.IsNullOrWhiteSpace(subscription.User.Email))
                    {
                        string subject = "Subscription Reminder";
                        string body = $"<p>Your subscription for Class Service ID {subscription.Id} will end in 5 days.</p>";

                        await _emailServiceH.SendEmailRAsync(subscription.User.Email, subject, body);
                    }
                }

                return Ok("Reminder emails sent successfully.");
            }

        }
    }
