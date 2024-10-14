using MailKit.Security;
using MimeKit;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.DTOs
{
    public class EmailServiceH
    {
        private readonly IConfiguration _configuration;

        public EmailServiceH(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailRAsync(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(_configuration["MailSettings:DisplayName"], _configuration["MailSettings:FromEmail"]));
            email.To.Add(new MailboxAddress(toEmail, toEmail));
            email.Subject = subject;

            var builder = new BodyBuilder { HtmlBody = body };
            email.Body = builder.ToMessageBody();

            using var smtpClient = new SmtpClient();

            try
            {
                await smtpClient.ConnectAsync(_configuration["MailSettings:SmtpHost"], int.Parse(_configuration["MailSettings:SmtpPort"]), SecureSocketOptions.SslOnConnect);

                await smtpClient.AuthenticateAsync(_configuration["MailSettings:SmtpUser"], _configuration["MailSettings:SmtpPass"]);

                await smtpClient.SendAsync(email);
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Failed to send email.", ex);
            }
            finally
            {
                await smtpClient.DisconnectAsync(true);
            }
        }
    }
}