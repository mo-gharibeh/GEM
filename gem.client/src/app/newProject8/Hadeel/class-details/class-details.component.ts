import { Component } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.css'
})
export class ClassDetailsComponent {
  selectedTime: any = null; // To hold the selected class time
  userId: number | 0 = 0; // Store the user ID
  parameter: any
  array: any
  classTimes: any[] = []; // Store the class times

  ngOnInit() {
    debugger
    this.parameter = this._rout.snapshot.paramMap.get("id");
    this.getClassById(this.parameter)

   this. getClassTimes(this.parameter)
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      // If the user is not logged in, redirect to login page
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }
  constructor(private _ser: UrlServiceService, private _rout: ActivatedRoute, private router: Router) { }

  ClassDetails: any

  getClassById(id: any) {
    debugger
    this._ser.getClassById(id).subscribe((data) => {
      debugger
      this.ClassDetails = data
      console.log(this.ClassDetails)
    })
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
    if (!this.selectedTime) {
      alert('Please select a time before joining.');
      return;
    }
    debugger
    // Check again if the user is logged in before proceeding
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      // If not logged in, redirect to login
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }
    this.completePaymentAndJoin()
    // After login, proceed to PayPal for payment
   /* this.processPayment();*/
  }
  // Redirect to PayPal for payment
  //processPayment() {
  //  this._ser.payForClass(this.ClassDetails.id, this.selectedTime).subscribe((paymentUrl: string) => {
  //    // Redirect the user to the PayPal payment page
  //    window.location.href = paymentUrl;
  //  });
  //}

  // After PayPal redirects back, handle successful payment and join the class
  completePaymentAndJoin() {
    debugger
    // Assume the backend sends you back to a success URL after payment
    this._ser.joinClass(this.ClassDetails.id, this.selectedTime, this.userId).subscribe(() => {
      debugger
      alert('Successfully joined the class!');
    }, (error) => {
      console.error('Error joining class:', error);
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
