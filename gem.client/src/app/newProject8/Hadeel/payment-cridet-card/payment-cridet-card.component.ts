import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment-cridet-card.component.html', // Ensure this matches your HTML file name
  styleUrls: ['./payment-cridet-card.component.css'] // Ensure this matches your CSS file name
})
export class PaymentComponent implements OnInit {
  stripe: any;
  card: any;
  amount = 53.98; // Set your amount
  userId = 1;  // Example user ID
  classSubId = 1;  // Example class subscription ID
  classTimeId = 1;  // Example class time ID

  billingDetails = {
    firstName: '',
    lastName: '',
    companyName: '',
    address: '',
    email: '',
    phone: ''
  };

  constructor(private http: HttpClient) { }

  async ngOnInit() {
    this.stripe = await loadStripe('your-stripe-publishable-key'); // Replace with your actual publishable key
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  async handlePayment(event: Event) {
    event.preventDefault(); // Prevent default form submission

    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.error(error);
    } else {
      const paymentData = {
        UserId: this.userId,
        ClassSubId: this.classSubId,
        ClassTimeId: this.classTimeId,
        PaymentToken: token.id,
        Amount: this.amount,
        BillingDetails: this.billingDetails
      };

      this.http.post('https://localhost:5001/api/gym/checkoutForSubscription', paymentData)
        .subscribe(response => {
          console.log('Payment successful', response);
        }, error => {
          console.error('Payment error', error);
        });
    }
  }
}
