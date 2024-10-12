using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ProductsController(MyDbContext db)
        {
            _db = db;


        }


        [HttpGet("GetProducts")]
        public IActionResult products()
        {


            var products = _db.Products.ToList();
            if (products != null)
            {
                return Ok(products);
            }

            return NotFound();
        }

        [HttpGet("GetProductbyId/{id}")]
        public IActionResult GetProduct(int id)
        {
            var product = _db.Products.FirstOrDefault(p => p.ProductId == id);
            if (product != null)
            {
                return Ok(product);
            }
            return NotFound();





        }


        [HttpGet("ProductsbyCategoryId/{id}")]

        public IActionResult productsCat(int id)
        {

            var products = _db.Products.Where(a => a.CategoryId == id).ToList();

            if (id <= 0)
            {
                return BadRequest();

            }
            if (products != null)
            {
                return Ok(products);

            }

            return NotFound();


        }


        [HttpGet("Count")]
        public IActionResult Count()
        {
            var product = _db.Products.Count();
            return Ok(product);
        }



    }
}
