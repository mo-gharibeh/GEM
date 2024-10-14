namespace GEM.Server.DTOs
{
    public class PayPalExecutionDTORama
    {
        // The PayPal payment ID returned when the payment was created
        public string PaymentId { get; set; }

        // The PayPal payer ID returned when the payment was approved by the user
        public string PayerId { get; set; }

        // The ID of the user who is joining the class
        public int UserId { get; set; }

        // The ID of the class the user wants to join
        public int ClassId { get; set; }

        // The ID of the class time the user has selected
        public int ClassTimeId { get; set; }
    }
}
