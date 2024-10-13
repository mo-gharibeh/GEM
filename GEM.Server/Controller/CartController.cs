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
            var cart = _db.CartItems
                .Join(_db.Products,
                    c => c.ProductId,
                    p => p.ProductId,
                    (c, p) => new
                    {
                        CartItemId = c.CartItemId,
                        UserId = c.Cart.UserId,
                        ProductId = c.ProductId,
                        Quantity = c.Quantity,
                        ProductName = p.ProductName,
                        Image = p.Image,
                        Description = p.Description,
                        Price = p.Price
                    })
                .Where(cartItem => cartItem.UserId == id)
                .ToList();

            return Ok(cart);
        }


        [HttpPost("Cart/{userId}")]
        public IActionResult PostCart(int userId, [FromBody] CartDTORequist cart)
        {

            var userCart = _db.Carts.FirstOrDefault(c => c.UserId == userId);

            if (userCart == null)
            {

                userCart = new Cart
                {
                    UserId = userId
                };
                _db.Carts.Add(userCart);
                _db.SaveChanges();
            }


            var existingCartItem = _db.CartItems
                .Include(c => c.Cart)
                .FirstOrDefault(c => c.ProductId == cart.ProductId && c.Cart.UserId == userId);

            if (existingCartItem != null)
            {

                existingCartItem.Quantity += cart.Quantity ?? 1;
                _db.Entry(existingCartItem).State = EntityState.Modified;
            }
            else
            {

                var newCartItem = new CartItem
                {
                    ProductId = cart.ProductId,
                    Quantity = cart.Quantity ?? 1,
                    Price = cart.Price,
                    CartId = userCart.CartId
                };

                _db.CartItems.Add(newCartItem);
            }

            _db.SaveChanges();

            return Ok(new { message = "Item added successfully." });
        }


        [HttpPut("Cart/{userId}/{cartItemId}")]
        public IActionResult UpdateCartItem(int userId, int cartItemId, [FromBody] int newQuantity)
        {
            var existingCartItem = _db.CartItems
                .Include(c => c.Cart)
                .FirstOrDefault(c => c.CartItemId == cartItemId && c.Cart.UserId == userId);

            if (existingCartItem == null)
            {
                return NotFound("Cart item not found.");
            }

            if (newQuantity <= 0)
            {
                return BadRequest("Quantity cannot be less than 1.");
            }

            existingCartItem.Quantity = newQuantity;

            _db.Entry(existingCartItem).State = EntityState.Modified;
            _db.SaveChanges();

            return Ok(new { message = "Cart item updated successfully." });
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

            return Ok(new { message = "Cart item deleted successfully." });
        }

    }



}
