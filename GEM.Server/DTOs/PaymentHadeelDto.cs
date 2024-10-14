namespace GEM.Server.DTOs;

public class PaymentHadeelDto
{
    public int PaymentId { get; set; }          // Unique identifier for each payment
    public int UserId { get; set; }             // ID of the user making the payment
    public int ClassSubId { get; set; }         // Subscription class ID
    public int ClassTimeId { get; set; }        // Class time ID
    public string PaymentToken { get; set; }    // Token received from the payment gateway (e.g., Stripe)
    public decimal Amount { get; set; }         // Amount of the payment
    public string FirstName { get; set; }       // First name of the payer
    public string LastName { get; set; }        // Last name of the payer
    public string CompanyName { get; set; }     // Company name (optional)
    public string Address { get; set; }         // Billing address
    public string Email { get; set; }           // Email address of the payer
    public string Phone { get; set; }           // Phone number of the payer
    public DateTime CreatedAt { get; set; }     // Date and time when the record was created
}
