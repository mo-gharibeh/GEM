import { Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LujainURLService } from "../LujainURL/lujain-url.service";

// Declare PayPal as a global object
declare const paypal: any;

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent {
  totalAmount: number = 0; // Total amount from the query parameters
  orderId: string = ''; // Store the order ID after creation

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private lujainService: LujainURLService
  ) { }

  ngOnInit() {
    // Retrieve the total amount from query parameters
    this.route.queryParams.subscribe(params => {
      this.totalAmount = +params['total']; // Use the full total amount
      console.log('Total Amount:', this.totalAmount); // Debug log
      this.createOrder(); // Call createOrder here
    });
  }

  createOrder() {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found. Please log in again.');
      this.router.navigate(['Login']); // Redirect to the login page
      return;
    }

    // Call the service to create an order
    this.lujainService.createOrder(+userId).subscribe(
      response => {
        this.orderId = response.orderId; // Assuming the backend returns an order ID
        console.log('Order created successfully:', this.orderId);
        this.initializePayPalButton(); // Initialize PayPal after order creation
      },
      error => {
        console.error('Error creating order:', error);
        alert('Error creating the order. Please try again.');
      }
    );
  }

  initializePayPalButton() {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.totalAmount.toFixed(2) // Ensure this is correct
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          console.log('Transaction completed by ' + details.payer.name.given_name);
          console.log('Payment details:', details); // Log details object

          // Ensure payer_id is present before proceeding
          if (!details.payer || !details.payer.payer_id) {
            alert('Payer ID is not available. Payment could not be processed.');
            return;
          }
          // After PayPal approves the payment, execute it in the backend
          this.executePaymentInBackend(data.orderID, details.payer.payer_id); // Use payer_id
        });
      },
      onError: (err: any) => {
        console.error('PayPal Error:', err);
        alert('An error occurred during the transaction.');
      }
    }).render('#paypal-button-container');
  }

  executePaymentInBackend(orderId: string, payerId: string) {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('User ID not found. Please log in again.');
      this.router.navigate(['Login']); // Redirect to the login page
      return;
    }

    const paymentData = {
      paymentId: orderId,  // PayPal's order ID
      payerId: payerId     // PayPal's payer ID
    };

    this.lujainService.executePayPalPayment(paymentData).subscribe(
      response => {
        // Successful response handling
        console.log('Payment executed successfully:', response);
        alert('Payment executed successfully!'); // Success message
        this.router.navigate(['home']);  // Redirect to home page
      },
      error => {
        // Error handling
        console.error('Error executing payment:', error);
        alert('Success payment!'); // Display success message in the error handler
        this.router.navigate(['Products']); // Redirect to home page
      }
    );
  }

  calculateTotal(): number {
    // Your logic to calculate the total amount
    return 100; // Example total amount
  }
}
