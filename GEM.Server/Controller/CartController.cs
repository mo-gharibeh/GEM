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
            if (id != cart.CartId)
            {
                return BadRequest("UserID does not match.");
            }

            var existingCartItem = _db.CartItems
                .FirstOrDefault(c => c.ProductId == cart.ProductId && c.CartId == cart.CartId);

            if (existingCartItem != null)
            {
                existingCartItem.Quantity += cart.Quantity;
                _db.Entry(existingCartItem).State = EntityState.Modified;
            }
            else
            {
              
                var newCartItem = new CartItem
                {
                    CartId = cart.CartId, 
                    ProductId = cart.ProductId, 
                    Quantity = cart.Quantity ?? 1, 
                    Price = cart.Price 
                };

                _db.CartItems.Add(newCartItem);
            }

            _db.SaveChanges();

            return Ok("Item added to cart successfully.");
        }


        [HttpPut("Cart/{userId}/{cartItemId}/{action}")]
        public IActionResult UpdateCartItem(int userId, int cartItemId, string action)
        {
            var existingCartItem = _db.CartItems
                .Include(c => c.Cart) 
                .FirstOrDefault(c => c.CartItemId == cartItemId && c.Cart.UserId == userId);

            if (existingCartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            if (action.ToLower() == "increment")
            {
                existingCartItem.Quantity++;
            }
            else if (action.ToLower() == "decrement")
            {
                if (existingCartItem.Quantity > 1)
                {
                    existingCartItem.Quantity--;
                }
                else
                {
                    return BadRequest("Quantity cannot be less than 1.");
                }
            }
            else
            {
                return BadRequest("Invalid action. Use 'increment' or 'decrement'.");
            }

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
