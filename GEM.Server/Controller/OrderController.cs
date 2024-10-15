using GEM.Server.DTOs;
using GEM.Server.Models;
using GEM.Server.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using PayPal.Api;
using System.Text.Json;

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
        public IActionResult CreateOrder(int userId)
        {
            try
            {
                // Get the user's cart
                var cart = _db.Carts.FirstOrDefault(c => c.UserId == userId);
                if (cart == null)
                {
                    return BadRequest("No cart found for the user.");
                }

                // Get the cart items
                var cartItems = _db.CartItems.Where(ci => ci.CartId == cart.CartId).ToList();
                if (!cartItems.Any())
                {
                    return BadRequest("No items in the cart to checkout.");
                }

                decimal totalAmount = 0;
                foreach (var item in cartItems)
                {
                    var product = _db.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
                    if (product != null && item.Quantity.HasValue && product.Price.HasValue)
                    {
                        totalAmount += item.Quantity.Value * product.Price.Value; // Calculate total amount
                    }
                }

                // Create a new order with the calculated total amount
                var order = CreateNewOrder(userId, totalAmount);

                // Clear the cart after the order is successfully created
                ClearCart(cart.CartId);

                return Ok(new { message = "Order created successfully.", orderId = order.OrderId });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error creating order: {ex.Message}");
            }
        }

        // Checkout with PayPal
        [HttpPost("CheckoutWithPayPal/{userId}")]
        public IActionResult CheckoutWithPayPal(int userId, [FromBody] PaymentDTO paymentInfo)
        {
            // Validate Payment Info
            if (string.IsNullOrEmpty(paymentInfo.ReturnUrl) || string.IsNullOrEmpty(paymentInfo.CancelUrl))
            {
                return BadRequest("Return URL and Cancel URL must be provided.");
            }

            // Get the user's cart
            var cart = _db.Carts.FirstOrDefault(c => c.UserId == userId);
            if (cart == null)
            {
                return BadRequest("No cart found for the user.");
            }

            var cartItems = _db.CartItems.Where(ci => ci.CartId == cart.CartId).ToList();
            if (!cartItems.Any())
            {
                return BadRequest("No items in the cart to checkout.");
            }

            decimal totalAmount = 0;
            foreach (var item in cartItems)
            {
                var product = _db.Products.FirstOrDefault(p => p.ProductId == item.ProductId);
                if (product == null || item.Quantity == null || product.Price == null) continue;

                totalAmount += item.Quantity.Value * product.Price.Value;
            }

            // Now initiate PayPal payment
            var createdPayment = _payPalPaymentService.CreatePayment(totalAmount, paymentInfo.ReturnUrl, paymentInfo.CancelUrl);

            var approvalUrl = createdPayment.links.FirstOrDefault(l => l.rel == "approval_url")?.href;
            if (approvalUrl == null) return BadRequest("Failed to generate PayPal payment.");

            // At this point, return the approval URL along with the total amount
            return Ok(new { approvalUrl, totalAmount });
        }

        // Execute PayPal payment
        [HttpPost("ExecutePayPalPayment/{userId}")]
        public IActionResult ExecutePayPalPayment(int userId, [FromBody] PayPalExecutionDTO executionInfo)
        {
            // Validate inputs
            if (executionInfo == null || string.IsNullOrEmpty(executionInfo.PaymentId) || string.IsNullOrEmpty(executionInfo.PayerId))
            {
                return BadRequest("Invalid payment execution information.");
            }

            // Log execution info for debugging
            Console.WriteLine($"PaymentId: {executionInfo.PaymentId}, PayerId: {executionInfo.PayerId}");

            // Execute the payment
            var executedPayment = _payPalPaymentService.ExecutePayment(executionInfo.PaymentId, executionInfo.PayerId);

            // Log the executed payment for debugging
            if (executedPayment == null)
            {
                // Log the error response from PayPal
                Console.WriteLine("Payment execution failed. Check PayPal API response.");
                return BadRequest("Payment not approved or failed to execute.");
            }

            Console.WriteLine($"Executed Payment State: {executedPayment.state}");

            // Check if the payment was approved
            if (executedPayment.state.ToLower() != "approved")
            {
                return BadRequest("Payment not approved or failed to execute.");
            }

            // Create the order in the database
            var totalAmount = decimal.Parse(executedPayment.transactions.First().amount.total);
            var newOrder = CreateNewOrder(userId, totalAmount);
            AddPaymentRecord(newOrder.OrderId, totalAmount, "PayPal");

            // Clear the cart after successful payment execution
            ClearCart(_db.Carts.FirstOrDefault(c => c.UserId == userId).CartId);

            return Ok(new { message = "Payment successful.", orderId = newOrder.OrderId });
        }

        // Clear the cart
        private void ClearCart(int cartId)
        {
            var cartItems = _db.CartItems.Where(ci => ci.CartId == cartId).ToList();
            _db.CartItems.RemoveRange(cartItems);
            _db.SaveChanges();
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

            return newOrder;
        }

        // Add payment record for the order
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

        //// Update the status of an existing order
        //[HttpPut("UpdateOrderStatus/{orderId}")]
        //public IActionResult UpdateOrderStatus(int orderId, [FromBody] string newStatus)
        //{
        //    try
        //    {
        //        var order = _db.Orders.FirstOrDefault(o => o.OrderId == orderId);
        //        if (order == null)
        //        {
        //            return NotFound("Order not found.");
        //        }

        //        // Update the order's shipping status
        //        order.ShippngStatus = newStatus;
        //        _db.SaveChanges();

        //        return Ok(new { message = "Order status updated successfully.", orderId = orderId, newStatus = newStatus });
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest($"Error updating order status: {ex.Message}");
        //    }
        //}
        [HttpPut("UpdateOrderStatus/{orderId}")]
        public IActionResult UpdateOrderStatus(int orderId, [FromBody] StatusUpdateRequest request)
        {
            try
            {
                // Find the order by the provided orderId
                var order = _db.Orders.FirstOrDefault(o => o.OrderId == orderId);
                if (order == null)
                {
                    return NotFound("Order not found.");
                }

                // Update the existing ShippngStatus field with the value from the DTO
                order.ShippngStatus = request.ShippngStatus;
                _db.SaveChanges(); // Save changes to the database

                return Ok(new { message = "Order status updated successfully.", orderId = orderId, newStatus = request.ShippngStatus });
            }
            catch (Exception ex)
            {
                return BadRequest($"Error updating order status: {ex.Message}");
            }
        }


    }
}
