using GEM.Server.DTOs;
using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly MyDbContext _db;
        public CartController(MyDbContext db)
        {
            _db = db;

        }


        [HttpGet("Cart/{id}")]
        public IActionResult Cart(int id)
        {
            var cart = _db.CartItems.Where(a => a.Cart.UserId == id);
            return Ok(cart);
        }


        [HttpPost("Cart/{id}")]
        public IActionResult PostCart(int id, [FromBody] CartDTORequist cart)
        {
            var cartEntity = _db.Carts.Include(c => c.User).FirstOrDefault(c => c.CartId == id);

            if (cartEntity == null || cartEntity.UserId != id)
            {
                return BadRequest("Cart does not exist or UserID does not match.");
            }

            var existingCartItem = _db.CartItems
                .FirstOrDefault(c => c.ProductId == cart.ProductId && c.CartId == cartEntity.CartId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += cart.Quantity ?? 1; 
                _db.Entry(existingCartItem).State = EntityState.Modified;
            }
            else
            {
                var newCartItem = new CartItem
                {
                    CartId = cartEntity.CartId, 
                    ProductId = cart.ProductId,
                    Quantity = cart.Quantity ?? 1,
                    Price = cart.Price
                };

                _db.CartItems.Add(newCartItem);
            }

            _db.SaveChanges();

            return Ok("Item added to cart successfully.");
        }



        [HttpPut("Cart/{userId}/{cartItemId}")]
        public IActionResult UpdateCartItem(int userId, int cartItemId, [FromBody] int quantityChange)
        {
            var existingCartItem = _db.CartItems
                .Include(c => c.Cart)
                .FirstOrDefault(c => c.CartItemId == cartItemId && c.Cart.UserId == userId);

            if (existingCartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            if (existingCartItem.Quantity + quantityChange <= 0)
            {
                return BadRequest("Quantity cannot be less than 1.");
            }

            existingCartItem.Quantity += quantityChange;

            _db.Entry(existingCartItem).State = EntityState.Modified;

            _db.SaveChanges();

            return Ok("Cart item updated successfully.");
        }



        [HttpDelete("Cart/{userId}/{cartItemId}")]
        public IActionResult DeleteCartItem(int userId, int cartItemId)
        {
            var cartItem = _db.CartItems.FirstOrDefault(ci => ci.CartItemId == cartItemId && ci.Cart.UserId == userId);

            if (cartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            _db.CartItems.Remove(cartItem);

            _db.SaveChanges();

            return Ok("Cart item deleted successfully.");
        }

    }



}
