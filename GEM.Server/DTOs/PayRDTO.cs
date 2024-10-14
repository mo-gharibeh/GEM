namespace GEM.Server.DTOs
{
    public class PaymentRequestHDTO
    {
        public int UserId { get; set; }
        public int ClassSubId { get; set; }
        public int ClassTimeId { get; set; }
        public string PaymentToken { get; set; } // Token from the frontend for Stripe payment
        public decimal Amount { get; set; } // Payment amount
    }
}
