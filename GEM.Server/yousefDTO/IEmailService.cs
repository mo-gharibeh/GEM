
namespace GEM.Server.yousefDTO
{
    public interface IEmailService
    {

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IEmailService, EmailService>();
            services.AddControllers();
            // other services
        }

        Task SendEmailAsync(string? email, string userEmailSubject, string userEmailBody);
    }
}
