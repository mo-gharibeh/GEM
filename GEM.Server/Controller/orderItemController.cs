using GEM.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace GEM.Server.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class orderItemController : ControllerBase
    {
        private readonly MyDbContext _db;
        public orderItemController(MyDbContext db)
        {
            _db = db;


        }



        [HttpGet("GetOrders")]
        public IActionResult GetAllOrders()
        {

            var orders = _db.Orders.ToList();


            return Ok(orders);
        }


        [HttpGet("GetorderItemByOrderId/{Id}")]
        public IActionResult GetOrderItems(int Id)
        {
            //var orderItems = _db.OrderItems
            //    .Where(oi => oi.OrderId == Id)
            //    .ToList();


            //if (orderItems == null || !orderItems.Any())
            //{
            //    return NotFound($"No order items found for OrderId {Id}");
            //}

            //return Ok(orderItems);

            var orderItems = _db.OrderItems.Join(_db.Products,
               order => order.ProductId,
               products => products.ProductId,
               (order, products) => new
               {
                   id = order.OrderId,
                   OrderItemId = order.OrderItemId,
                   Quantity = order.Quantity,
                   TotalAmount = order.TotalAmount,
                   ProductName = products.ProductName,
                   Image = products.Image,
               })
               .Where(oi => oi.id == Id)
               .ToList();


            if (orderItems == null || !orderItems.Any())
            {
                return NotFound($"No order items found for OrderId {Id}");
            }

            return Ok(orderItems);
        }
    }




}

