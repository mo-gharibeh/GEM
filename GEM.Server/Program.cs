using GEM.Server.Models;
using GEM.Server.Service;
using GEM.Server.yousefDTO;
using Microsoft.EntityFrameworkCore;
using GEM.Server.DTOs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("Development", options =>
    {
        options.AllowAnyHeader();
        options.AllowAnyMethod();
        options.AllowAnyOrigin();
    });
}); 

builder.Services.AddScoped<IEmailService, GEM.Server.yousefDTO.EmailService>();
builder.Services.AddScoped<PayPalPaymentService>();
builder.Services.AddScoped<PaymentServiceH>();



//Configure PayPal settings from appsettings.json
builder.Services.AddSingleton(sp =>
{
    var config = new Dictionary<string, string>
    {
        { "clientId", builder.Configuration["PayPal:ClientId"] },
        { "clientSecret", builder.Configuration["PayPal:ClientSecret"] },
        { "mode", builder.Configuration["PayPal:Mode"] } // sandbox or live
    };

return new PayPalConfigManager(config);
});

//Register PayPalPaymentService
builder.Services.AddTransient<PayPalPaymentService>();

builder.Services.AddTransient<GEM.Server.yousefDTO.EmailService>();


builder.Services.AddSingleton<IConfiguration>(builder.Configuration);


builder.Configuration
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
var environment = builder.Environment.EnvironmentName;

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("Development");

app.MapFallbackToFile("/index.html");

app.Run();
