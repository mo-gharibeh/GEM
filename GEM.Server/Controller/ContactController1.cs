using GEM.Server.Models;
using GEM.Server.yousefDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using MailKit.Net.Smtp;


namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController1 : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly IEmailService _emailService;

        public ContactController1(MyDbContext db , IEmailService emailService)
        {
            _db = db;
            _emailService = emailService;
        }


        [HttpGet("GetMessage")]

        public IActionResult GetMessage()
        {

            var message = _db.ContactUs.ToList();

            return Ok(message);
        }


        ///////////////////////////////////////////////////////////////////////


        //[HttpPost("PostMessage")]
        //public IActionResult PostMessage([FromForm] ContactUsDto contactUsDto)
        //{


        //    var contact = new ContactU
        //    {
        //        Name = contactUsDto.Name,
        //        Email = contactUsDto.Email,
        //        MessageContent = contactUsDto.MessageContent,
        //        Subject = contactUsDto.Subject,
        //        SentDate = DateTime.Now,  

        //    };

        //    _db.ContactUs.Add(contact);
        //    _db.SaveChanges();

        //    return Ok(new { Message = "Contact message sent successfully!" });
        //}
        [HttpPost("PostMessage")]
        public async Task<IActionResult> PostMessage([FromForm] ContactUsDto contactUsDto, [FromServices] IEmailService emailService)
        {
            // Save the contact message to the database


            var contact = new ContactU
            {
                Name = contactUsDto.Name,
                Email = contactUsDto.Email,
                MessageContent = contactUsDto.MessageContent,
                Subject = contactUsDto.Subject,
                SentDate = DateTime.Now,
                SentDate = DateTime.Now,

            };

            _db.ContactUs.Add(contact);
            _db.SaveChanges();

            var subject = contactUsDto.Subject;
            var messageBody = $"You have received a new message from {contactUsDto.Name} ({contactUsDto.Email}):<br><br>{contactUsDto.MessageContent}";

            try
            {
                // Use the EmailService to send the email
                await emailService.SendEmailAsync("admin@example.com", subject, messageBody);

                return Ok(new { Message = "Contact message sent successfully and email delivered!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = $"Message saved, but failed to send email: {ex.Message}" });
            }
        }



    }
}
