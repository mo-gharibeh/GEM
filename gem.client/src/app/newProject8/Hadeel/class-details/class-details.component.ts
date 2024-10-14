import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {

  selectedTime: number | 0 = 0; // To hold the selected class time
  userId: number = 0; // Store the user ID
  classTimes: any[] = []; // Store the class times
  ClassDetails: any; // Store class details

  constructor(
    private _ser: UrlServiceService,
    private _rout: ActivatedRoute,
    private router: Router
  ) { }
    parameter: any

  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get("id");
    this.getClassById(this.parameter);
    this.getClassTimes(this.parameter);

    // Check if user is logged in
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }

    // Check if PayPal returned parameters
    const paymentId = this._rout.snapshot.queryParamMap.get('paymentId');
    const payerId = this._rout.snapshot.queryParamMap.get('PayerID');
    if (paymentId && payerId) {
      this.executePayPalPayment(paymentId, payerId);
    }
  }

  // Fetch class details by ID
  getClassById(id: any) {
    this._ser.getClassById(id).subscribe((data) => {
      this.ClassDetails = data;
    });
  }

  // Fetch class times for the class
  getClassTimes(classId: number) {
    this._ser.getClassTimes(classId).subscribe(
      (data: any[]) => {
        this.classTimes = data;
      },
      (error) => {
        console.error('Error fetching class times', error);
      }
    );
  }

  // Handle class joining
  joinClass() {
    debugger
    // Check if class time is selected
    if (!this.selectedTime) {
      alert('Please select a time before joining.');
      return;
    }
    debugger
    // Check again if the user is logged in before proceeding
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    debugger
    // Proceed to PayPal for payment
    this.processPayment();
  }

  // Redirect to PayPal for payment
  processPayment() {
    debugger
    this._ser.payForClass(this.ClassDetails.id, this.selectedTime).subscribe((paymentUrl: string) => {
      window.location.href = paymentUrl;  // Redirect to PayPal payment page
    });
  }

  // After PayPal redirects back, handle successful payment and join the class
  executePayPalPayment(paymentId: string, payerId: string) {
    debugger
    this._ser.executePayPalPayment(paymentId, payerId, this.ClassDetails.id, this.selectedTime).subscribe(() => {
      alert('Successfully joined the class!');
      this.router.navigate(['/class-confirmation']);  // Navigate to confirmation page or class details
    }, (error) => {
      console.error('Error executing PayPal payment:', error);
      alert('Failed to join the class. Please try again.');
    });
  }

  // Format date to a readable string
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }
}
