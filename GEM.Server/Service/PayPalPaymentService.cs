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

        // Create payment but do not modify the cart at this stage
        public Payment CreatePayment(decimal totalAmount, string returnUrl, string cancelUrl)
        {
            var apiContext = GetAPIContext(); // Make sure this returns a valid APIContext

            // Create a new Payment object
            var payment = new Payment
            {
                intent = "sale", // Intent of the payment
                payer = new Payer { payment_method = "paypal" }, // Payment method
                transactions = new List<Transaction>
        {
            new Transaction
            {
                amount = new Amount
                {
                    currency = "USD",
                    total = totalAmount.ToString("F2"), // Format total to 2 decimal places
                },
                description = "Payment for your order" // Description for the transaction
            }
        },
                redirect_urls = new RedirectUrls
                {
                    return_url = returnUrl, // URL to return to after approval
                    cancel_url = cancelUrl // URL to return to if the payment is cancelled
                }
            };

            try
            {
                // Create payment
                var createdPayment = payment.Create(apiContext);
                return createdPayment;
            }
            catch (PayPal.PaymentsException ex)
            {
                // Log the exception for debugging
                Console.WriteLine($"Error creating payment: {ex.Message}");
                throw; // Rethrow or handle as necessary
            }
        }
        public Payment ExecutePayment(string paymentId, string payerId)
        {
            var apiContext = GetAPIContext(); 
            var paymentExecution = new PaymentExecution { payer_id = payerId };
            var payment = new Payment { id = paymentId }; 

            try
            {
                Console.WriteLine("Executing payment...");
                Console.WriteLine($"Payment ID: {paymentId}");
                Console.WriteLine($"Payer ID: {payerId}");

                // Execute the payment using PayPal API context and payment execution details
                var executedPayment = payment.Execute(apiContext, paymentExecution);

                // Log the state of the payment
                Console.WriteLine($"Payment State: {executedPayment.state}");
                Console.WriteLine($"Payment ID: {executedPayment.id}");
                Console.WriteLine($"Payer ID: {paymentExecution.payer_id}");

                // Check if the payment was approved
                if (executedPayment.state.ToLower() == "approved")
                {
                    Console.WriteLine("Payment approved and successful.");
                }
                else
                {
                    Console.WriteLine("Payment was not approved.");
                }

                return executedPayment; // Return the executed payment object
            }
            catch (PayPal.PaymentsException ex)
            {
                // Log the error response from PayPal for debugging
                Console.WriteLine($"Error executing payment: {ex.Message}");
                if (ex.Response != null)
                {
                    Console.WriteLine($"Response Details: {ex.Response}");
                }
                throw new Exception($"PayPal payment execution failed: {ex.Message}", ex);
            }
            catch (Exception ex)
            {
                // Catch any other unexpected errors
                Console.WriteLine($"Unexpected error executing payment: {ex.Message}");
                throw; // Rethrow or handle as necessary
            }
        }



        public APIContext GetAPIContext()
        {
            try
            {
                // Prepare the configuration settings
                var config = new Dictionary<string, string>
        {
            { "clientId", _configManager.GetClientId() },      // Use the client ID from config manager
            { "clientSecret", _configManager.GetClientSecret() }, // Use the client secret from config manager
            { "mode", _configManager.GetMode() } // Use "sandbox" or "live" mode
        };

                // Retrieve the access token
                var accessToken = new OAuthTokenCredential(config["clientId"], config["clientSecret"]).GetAccessToken();

                // Log the access token for debugging (optional)
                Console.WriteLine($"Access Token: {accessToken}");

                // Create and return the APIContext
                return new APIContext(accessToken)
                {
                    Config = config
                };
            }
            catch (Exception ex)
            {
                // Log any exceptions that occur while getting the API context
                Console.WriteLine($"Error getting API context: {ex.Message}");
                throw; // Rethrow the exception to handle it in the calling method
            }
        }





        // Define a method to clear the cart if payment is successful
        private void ClearCart()
        {
            // Logic to clear the cart
        }
    }
}
