using GEM.Server.DTOs;
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


        [HttpPost("addProduct")]
        public IActionResult addProduct([FromForm] ProductDto addproduct)
        {

            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, addproduct.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                addproduct.Image.CopyToAsync(stream);

            }

            var newproduct = new Product
            {
                ProductName = addproduct.ProductName,
                Description = addproduct.Description,
                Image = addproduct.Image.FileName,
                Price = addproduct.Price,
                CategoryId = addproduct.CategoryId,
            };

            _db.Products.Add(newproduct);
            _db.SaveChanges();
            return Ok(newproduct);
        }



        [HttpPut("updateProduct/{id}")]
        public IActionResult updateProduct(int id, [FromForm] UpdateProductDto update)
        {

            var product = _db.Products.Where(p => p.ProductId == id).FirstOrDefault();




            var folder = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }
            var fileImage = Path.Combine(folder, update.Image.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                update.Image.CopyToAsync(stream);

            }

            product.ProductName = update.ProductName;
            product.Description = update.Description;
            product.Image = update.Image.FileName;
            product.Price = update.Price;
            product.CategoryId = update.CategoryId;
            _db.Products.Update(product);
            _db.SaveChanges();

            return Ok(product);


        }


        [Route("/api/Products/DeleteProduct/{id}")]
        [HttpDelete]
        public IActionResult DeleteById(int id)
        {
            var product = _db.Products.Find(id);

            if (product != null)
            {
                var orderItems = _db.OrderItems.Where(oi => oi.ProductId == id).ToList();

                if (orderItems.Any())
                {
                    _db.OrderItems.RemoveRange(orderItems);
                }

                _db.Products.Remove(product);
                _db.SaveChanges();

                return NoContent();
            }

            return NotFound();
        }


        [HttpGet("getImage/{imageName}")]
        public IActionResult getImage(string imageName)
        {
            var pathImage = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", imageName);
            if (System.IO.File.Exists(pathImage))
            {

                return PhysicalFile(pathImage, "image/*");

            }
            return NotFound();

        }


    }
}
