using PayPal.Api;

namespace GEM.Server.Service
{
    public class PayPalPaymentService
    {


        private readonly PayPalConfigManager _configManager;


        public PayPalPaymentService(PayPalConfigManager configManager)
        {
            _configManager = configManager;
        }

        public Payment CreatePayment(decimal totalAmount, string returnUrl, string cancelUrl)
        {

            var apiContext = GetAPIContext();

            var payment = new Payment
            {
                intent = "sale",
                payer = new Payer { payment_method = "paypal" },
                transactions = new List<Transaction>
            {
                new Transaction
                {
                    amount = new Amount
                    {
                        currency = "USD",
                        total = totalAmount.ToString("F2")
                    },
                    description = "Payment for your order"
                }
            },
                redirect_urls = new RedirectUrls
                {
                    return_url = returnUrl,
                    cancel_url = cancelUrl
                }
            };


            var createdPayment = payment.Create(apiContext);

            return createdPayment;
        }

        public Payment ExecutePayment(string paymentId, string payerId)
        {
            // Get the API context
            var apiContext = GetAPIContext();

            // Create a payment execution object and set the payer ID
            var paymentExecution = new PaymentExecution { payer_id = payerId };

            // Create the payment object by setting the payment ID
            var payment = new Payment { id = paymentId };

            // Execute the payment
            return payment.Execute(apiContext, paymentExecution);
        }

        // Get the API context (including access token)
        private APIContext GetAPIContext()
        {
            // Get an access token using the PayPal OAuth credential flow
            var accessToken = new OAuthTokenCredential(
                _configManager.GetClientId(),
                _configManager.GetClientSecret()).GetAccessToken();

            // Create and return the API context with the access token
            return new APIContext(accessToken)
            {
                Config = new Dictionary<string, string>
            {
                { "mode", _configManager.GetMode() } // sandbox or live mode
            }
            };
        }
    }
}
