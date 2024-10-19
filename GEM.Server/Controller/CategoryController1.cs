using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController1 : ControllerBase
    {
        private readonly MyDbContext _db;
        public CategoryController1(MyDbContext db)
        {
            _db = db;


        }

        [HttpGet("Category")]
        public IActionResult Category()
        {
            var category = _db.Categories.ToList();

            return Ok(category);

        }



        [HttpPost("addCategory")]
        public IActionResult AddCategory([FromForm] CategoryDto addcat)
        {


            var addcategory = new Category
            {
                CategoryName = addcat.CategoryName,

            };

            _db.Categories.Add(addcategory);
            _db.SaveChanges();
            return Ok(addcategory);
        }

        [HttpPut("UpdateCategory/{id}")]
        public IActionResult updatecategory(int id, [FromForm] UpdateCategoryDto update)
        {

            var category = _db.Categories.Where(p => p.CategoryId == id).FirstOrDefault();


            category.CategoryName = update.CategoryName;

            _db.Categories.Update(category);
            _db.SaveChanges();

            return Ok(category);


        }



        [HttpDelete("{id}")]
        public IActionResult DeleteById(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var deleteProducts = _db.Products.Where(p => p.CategoryId == id).ToList();

            if (!deleteProducts.Any())
            {
                return NotFound();
            }

            var productIds = deleteProducts.Select(p => p.ProductId).ToList();
            var deleteOrderItems = _db.OrderItems.Where(oi => productIds.Contains(oi.ProductId.Value)).ToList();

            _db.OrderItems.RemoveRange(deleteOrderItems);

            _db.Products.RemoveRange(deleteProducts);
            _db.SaveChanges();

            var deleteCategory = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
            if (deleteCategory != null)
            {
                _db.Categories.Remove(deleteCategory);
                _db.SaveChanges();
                return NoContent();
            }

            return NotFound();
        }





    }
}
