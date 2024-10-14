export class PaymentDTO {
  paymentMethod: string = ''; // e.g., PayPal
  returnUrl: string = '';     // PayPal success redirect URL
  cancelUrl: string = '';     // PayPal cancel redirect URL
  totalAmount: number = 0;    // Amount to be charged
}
