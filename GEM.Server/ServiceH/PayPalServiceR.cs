using Stripe;
using Stripe.Checkout;

public class PaymentServiceH
{
    private readonly string _secretKey;

    public PaymentServiceH(IConfiguration config)
    {
        _secretKey = config["Stripe:SecretKey"];
        StripeConfiguration.ApiKey = _secretKey;
    }

    public async Task<PaymentIntent> CreatePaymentIntent(decimal amount, string currency)
    {
        var options = new PaymentIntentCreateOptions
        {
            Amount = (long)(amount * 100), // Stripe expects the amount in cents
            Currency = currency,
            PaymentMethodTypes = new List<string> { "card" },
        };
        var service = new PaymentIntentService();
        return await service.CreateAsync(options);
    }
}
