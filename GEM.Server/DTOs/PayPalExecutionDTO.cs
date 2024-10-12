namespace GEM.Server.DTOs
{
    public class PayPalExecutionDTO
    {
        public string PaymentId { get; set; }
        public string PayerId { get; set; }
        public int UserId { get; set; }  // User Id for order processing
    }
}
