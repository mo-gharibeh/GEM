namespace GEM.Server.DTOs
{
    public class JoinClassRequest
    {
        public int ClassSubId { get; set; } // Subscription ID
        public int ClassTimeId { get; set; } // Time selected by the user
        public bool PaymentSuccessful { get; set; } // Flag to confirm payment success
        public string PaymentMethod { get; set; } // e.g., PayPal, Credit Card

    }
}
