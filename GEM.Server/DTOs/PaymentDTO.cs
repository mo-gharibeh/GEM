namespace GEM.Server.DTOs
{
    public class PaymentDTO
    {
        public string PaymentMethod { get; set; } // e.g., PayPal
        public string ReturnUrl { get; set; }     // PayPal success redirect URL
        public string CancelUrl { get; set; }     // PayPal cancel redirect URL
    }
}
