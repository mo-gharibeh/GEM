using GEM.Server.DTOs;
using GEM.Server.Models;
using GEM.Server.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PayPal.Api;
namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {

        private readonly MyDbContext _db;
        private readonly PayPalPaymentService _payPalPaymentService;

        public OrderController(MyDbContext db, PayPalPaymentService payPalPaymentService)
        {
            _db = db;
            _payPalPaymentService = payPalPaymentService;
        }






        // Create a new order (exposed as an API endpoint)
        [HttpPost("CreateOrder/{userId}")]
        public IActionResult CreateOrder(int userId, decimal totalAmount)
        {
            try
            {
                var order = CreateNewOrder(userId, totalAmount); // Reusing the private method
                return Ok(new { message = "Order created successfully.", orderId = order.OrderId });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating order: {ex.Message}");
            }
        }

        [HttpPost("CheckoutWithPayPal/{userId}")]
        public IActionResult CheckoutWithPayPal(int userId, [FromBody] PaymentDTO paymentInfo)
        {
            // Get the user's cart
            var cart = _db.Carts.FirstOrDefault(c => c.UserId == userId);
            if (cart == null) return BadRequest("No cart found for the user.");

            var cartItems = _db.CartItems.Where(ci => ci.CartId == cart.CartId).ToList();
            if (!cartItems.Any()) return BadRequest("No items in the cart to checkout.");

            decimal totalAmount = 0;
            foreach (var item in cartItems)
            {
                var product = _db.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
                if (product == null || item.Quantity == null || product.Price == null) continue;

                totalAmount += item.Quantity.Value * product.Price.Value;
            }

            var returnUrl = paymentInfo.ReturnUrl;
            var cancelUrl = paymentInfo.CancelUrl;
            var createdPayment = _payPalPaymentService.CreatePayment(totalAmount, returnUrl, cancelUrl);

            var approvalUrl = createdPayment.links.FirstOrDefault(l => l.rel == "approval_url")?.href;
            if (approvalUrl == null) return BadRequest("Failed to generate PayPal payment.");
            return Ok(new { approvalUrl });
        }

        [HttpPost("ExecutePayPalPayment")]
        public IActionResult ExecutePayPalPayment([FromBody] PayPalExecutionDTO executionInfo)
        {
            try
            {
                var executedPayment = _payPalPaymentService.ExecutePayment(executionInfo.PaymentId, executionInfo.PayerId);

                if (executedPayment.state.ToLower() != "approved") return BadRequest("Payment not approved.");

                var totalAmount = decimal.Parse(executedPayment.transactions.First().amount.total);
                var newOrder = CreateNewOrder(executionInfo.UserId, totalAmount);
                AddPaymentRecord(newOrder.OrderId, totalAmount, "PayPal");

                return Ok(new { message = "Payment successful.", orderId = newOrder.OrderId });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error executing PayPal payment: {ex.Message}");
            }
        }

        // Reusable private method for creating an order
        private Models.Order CreateNewOrder(int userId, decimal totalAmount)
        {
            var cart = _db.Carts.FirstOrDefault(c => c.UserId == userId);
            if (cart == null || !_db.CartItems.Any(ci => ci.CartId == cart.CartId))
                throw new Exception("Cart is empty.");

            var newOrder = new Models.Order
            {
                UserId = userId,
                TotalAmount = totalAmount,
                OrderDate = DateTime.UtcNow,
                ShippngStatus = "Pending"
            };

            _db.Orders.Add(newOrder);
            _db.SaveChanges();

            var cartItems = _db.CartItems.Where(ci => ci.CartId == cart.CartId).ToList();
            foreach (var cartItem in cartItems)
            {
                var product = _db.Products.FirstOrDefault(p => p.ProductId == cartItem.ProductId);
                if (product != null)
                {
                    var orderItem = new OrderItem
                    {
                        OrderId = newOrder.OrderId,
                        ProductId = product.ProductId,
                        Quantity = cartItem.Quantity,
                        TotalAmount = cartItem.Quantity.Value * product.Price
                    };

                    _db.OrderItems.Add(orderItem);
                }
            }

            _db.SaveChanges();

            _db.CartItems.RemoveRange(cartItems);
            _db.SaveChanges();

            return newOrder;
        }

        private void AddPaymentRecord(int orderId, decimal amount, string paymentMethod)
        {
            var payment = new Models.Payment
            {
                OrderId = orderId,
                Amount = amount,
                PaymentMethod = paymentMethod,
                PaymentDate = DateTime.UtcNow,
                Statues = "Success",
                PaymentGateWay = paymentMethod
            };

            _db.Payments.Add(payment);
            _db.SaveChanges();
        }





    }
}








