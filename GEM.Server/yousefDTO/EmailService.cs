﻿using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using MailKit.Security;

namespace GEM.Server.yousefDTO
{
    //public class EmailService : IEmailService
    //{
    //    public async Task SendEmailAsync(string email, string subject, string message)
    //    {
    //        var emailMessage = new MimeMessage();
    //        emailMessage.From.Add(new MailboxAddress("Admin", "admin@example.com"));
    //        emailMessage.To.Add(new MailboxAddress("", email));
    //        emailMessage.Subject = subject;
    //        emailMessage.Body = new TextPart("html") { Text = message };

    //        using (var client = new SmtpClient())
    //        {
    //            await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
    //            await client.AuthenticateAsync("your-email@example.com", "your-password");
    //            await client.SendAsync(emailMessage);
    //            await client.DisconnectAsync(true);
    //        }
    //    }
    //}

}

