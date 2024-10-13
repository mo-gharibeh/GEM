using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;

namespace GEM.Server.yousefDTO
{
    //public class EmailService : IEmailService
    //{
    //    public async Task SendEmailAsync(string to, string subject, string body)
    //    {
    //        var message = new MimeMessage();
    //        message.From.Add(new MailboxAddress("Your Website", "yourwebsite@example.com"));
    //        message.To.Add(new MailboxAddress("", to));
    //        message.Subject = subject;
    //        message.Body = new TextPart("html") { Text = body };

    //        using (var client = new SmtpClient())
    //        {
    //            await client.ConnectAsync("smtp.gmail.com", 465, true);
    //            await client.AuthenticateAsync("your-email@gmail.com", "your-email-password");
    //            await client.SendAsync(message);
    //            await client.DisconnectAsync(true);
    //        }
    //    }
    //}
}
