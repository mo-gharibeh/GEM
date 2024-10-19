using GEM.Server.Models;
using GEM.Server.yousefDTO;
using Microsoft.EntityFrameworkCore;
using GEM.Server.DTOs;
using GEM.Server.Service;
using System.Net;
using GEM.Server.Controller;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure database context with SQL Server
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));
builder.Services.AddScoped<EmailHadeelController>();

// Configure CORS
builder.Services.AddScoped<EmailHadeelController>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Development", builder =>
    {
        builder.AllowAnyHeader()
               .AllowAnyMethod()
               .AllowAnyOrigin();
    });
});
builder.Services.AddTransient<EmailServiceH>();
builder.Services.AddHostedService<EmailReminderService>();
// Register email service and payment service
builder.Services.AddScoped<IEmailService, GEM.Server.yousefDTO.EmailService>();
builder.Services.AddScoped<PaymentServiceH>();

// Configure PayPal settings from appsettings.json
builder.Services.AddSingleton(sp =>
{
    var config = new Dictionary<string, string>
    {
        { "clientId", builder.Configuration["PayPal:ClientId"] },
        { "clientSecret", builder.Configuration["PayPal:ClientSecret"] },
        { "mode", builder.Configuration["PayPal:Mode"] } // "sandbox" or "live"
    };
    return new PayPalConfigManager(config);
});

// Register PayPalPaymentService
builder.Services.AddScoped<PayPalPaymentService>();

// Logging configuration
builder.Logging.ClearProviders();
builder.Logging.AddConsole();

var app = builder.Build();

// Use CORS
app.UseCors("Development");

// Exception handling middleware
app.Use(async (context, next) =>
{
    try
    {
        await next();
    }
    catch (Exception ex)
    {
        // Log the exception (use your logger here)
        Console.WriteLine($"An error occurred: {ex.Message}");
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
        await context.Response.WriteAsync("An internal server error occurred.");
    }
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.MapFallbackToFile("/index.html");

// Run the application
app.Run();
