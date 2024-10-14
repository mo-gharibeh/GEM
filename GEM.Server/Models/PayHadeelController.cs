//using GEM.Server.DTOs;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Stripe;

//[ApiController]
//[Route("api/[controller]")]
//public class PaymentController : ControllerBase
//{
//    private readonly PaymentService _paymentService;

//    public PaymentController(PaymentService paymentService)
//    {
//        _paymentService = paymentService;
//    }

//    [HttpPost("create-payment-intent")]
//    public async Task<IActionResult> CreatePaymentIntent([FromBody] PaymentRequestHDTO paymentRequest)
//    {
//        var paymentIntent = await _paymentService.CreatePaymentIntent(paymentRequest.Amount, "usd");
//        return Ok(new { clientSecret = paymentIntent.ClientSecret });
//    }
//}
