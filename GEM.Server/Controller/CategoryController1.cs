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

            // Get all products under the category
            var deleteProducts = _db.Products.Where(p => p.CategoryId == id).ToList();

            if (!deleteProducts.Any())
            {
                return NotFound();
            }

            // Get all OrderItems related to the products in this category
            var productIds = deleteProducts.Select(p => p.ProductId).ToList();
            var deleteOrderItems = _db.OrderItems.Where(oi => productIds.Contains(oi.ProductId.Value)).ToList();

            // Delete OrderItems
            _db.OrderItems.RemoveRange(deleteOrderItems);

            // Delete Products
            _db.Products.RemoveRange(deleteProducts);
            _db.SaveChanges();

            // Delete the Category itself
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
