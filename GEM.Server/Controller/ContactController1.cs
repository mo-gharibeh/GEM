using GEM.Server.Models;
using GEM.Server.yousefDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController1 : ControllerBase
    {
        private readonly MyDbContext _db;
        public ContactController1(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("GetMessage")]

        public IActionResult GetMessage()
        {

            var message = _db.ContactUs.ToList();

            return Ok(message);
        }


        ///////////////////////////////////////////////////////////////////////


        [HttpPost("PostMessage")]
        public IActionResult PostMessage([FromForm] ContactUsDto contactUsDto)
        {


            var contact = new ContactU
            {
                Name = contactUsDto.Name,
                Email = contactUsDto.Email,
                MessageContent = contactUsDto.MessageContent,
                Subject = contactUsDto.Subject,
                SentDate = DateTime.Now,

            };

            _db.ContactUs.Add(contact);
            _db.SaveChanges();

            return Ok(new { Message = "Contact message sent successfully!" });
        }



    }
}
