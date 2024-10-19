import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
declare var paypal: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  providers: [DatePipe]
})
export class PaymentComponent implements OnInit {
  classId: number = 0;
  classTimeId: number = 0;
  totalAmount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    // Retrieve parameters from query
    this.route.queryParams.subscribe(params => {
      this.classId = +params['classId'] || 0;
      this.classTimeId = +params['classTimeId'] || 0;
    });

    // Get the total amount from local storage
    const storedAmount = localStorage.getItem('totalAmount');
    this.totalAmount = storedAmount ? +storedAmount : 0; // Ensure the value is a number

    this.loadPayPalButton(); // Load PayPal button after fetching parameters
  }

  loadPayPalButton() {
    // Ensure PayPal SDK is loaded
    if (typeof paypal !== 'undefined') {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.totalAmount.toString() // Use the amount from local storage
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            alert('Transaction completed by ' + details.payer.name.given_name);

            // Navigate to the class details page after successful payment
            this.router.navigate(['/Class']); // Replace with your actual class details route
          });
        },
        onCancel: (data: any) => {
          alert('Transaction was cancelled');
        },
        onError: (err: any) => {
          console.error('PayPal payment error:', err);
          alert('An error occurred with your payment');
        }
      }).render('#paypal-button-container'); // Render PayPal button
    } else {
      console.error('PayPal SDK not loaded.');
    }
  }
}
