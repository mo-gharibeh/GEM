using GEM.Server.DTOs.MohammadDTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class MohammadController1 : ControllerBase
    {
        private readonly MyDbContext _db;
        public MohammadController1(MyDbContext db)
        {
            _db = db;
        }

        // get all testimonials when status is Visible 
        [HttpGet("Testimonials")]
        public IActionResult Testimonials()
        {
            var testimonials = _db.Testimonials.Where(t => t.Status == "Visible").ToList();
            return Ok(testimonials);
        }

        // change status of testimonials to Visible or hidden
        [HttpPut("ChangeStatus/{id}")]
        public IActionResult ChangeStatus(int id)
        {
            var testimonialFromDb = _db.Testimonials.Find(id);
            if (testimonialFromDb == null)
            {
                return NotFound();
            }
            if (testimonialFromDb.Status == "Hidden")
            {
                testimonialFromDb.Status = "Visible";
            }
            else
            {
                testimonialFromDb.Status = "Hidden";
            }
            _db.SaveChanges();
            return Ok(testimonialFromDb);

        }

        // show the top four best selling products list 

        // GET: api/Products/TopSelling
        [HttpGet("top-products")]
        public IActionResult GetTopSellingProducts()
        {
            var topProducts = (from o in _db.OrderItems
                               join p in _db.Products on o.ProductId equals p.ProductId
                               group o by new { p.ProductId, p.ProductName, p.Image, p.Description, p.Price } into g
                               orderby g.Sum(x => x.Quantity) descending
                               select new TopSellingProductDto
                               {
                                   ProductID = g.Key.ProductId,
                                   ProductName = g.Key.ProductName,
                                   Image = g.Key.Image,
                                   Description = g.Key.Description,
                                   Price = g.Key.Price ?? 0m,
                                   TotalSold = g.Sum(x => x.Quantity ?? 0)
                               }).Take(4).ToList();

            return Ok(topProducts);
        }




    }
}
