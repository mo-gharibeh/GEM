import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-cridet-card.component.html',
  styleUrls: ['./payment-cridet-card.component.css']
})
export class PaymentComponent implements OnInit {
  stripe: any; // Holds the Stripe object
  card: any; // Holds the Stripe card element

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    // Load the Stripe.js library
    this.stripe = await loadStripe("pk_test_51Q9VGXJldkMKXWUvhbzJsr1xlCbi4MFaujcthB2IpSP0G1gjufrh6jHigJzrvRvPROy4zHKCQ97t79QmDP74CFFM00kOmTm2VQ"); // Replace with your Stripe publishable key

    const elements = this.stripe.elements();

    // Create the card element
    this.card = elements.create('card');

    // Mount the card element to the DOM
    this.card.mount('#card-element');
  }

  // Handle form submission
  async handlePayment(event: Event) {
    event.preventDefault(); // Prevent default form submission

    // Stripe Token API for simplicity (consider using createPaymentMethod)
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error(error.message);
    } else {
      // Send the token and payment data to your backend
      this.processPayment(token);
    }
  }

  // Call your backend API to process the payment
  processPayment(token: any) {
    const paymentData = {
      token: token.id,
      amount: 5000, // Example: $50.00 in cents
      // Add additional data like UserId, ClassSubId, etc.
    };

    this.http.post('/api/Gym/checkoutForSubscription', paymentData)
      .subscribe(
        (response) => {
          console.log('Payment successful!', response);
        },
        (error) => {
          console.error('Payment error:', error);
        }
      );
  }
}

function loadStripe(arg0: string): any {
    throw new Error('Function not implemented.');
}
