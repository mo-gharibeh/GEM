import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css'],
  providers: [DatePipe] // Provide the DatePipe
})
export class ClassDetailsComponent implements OnInit {
  classId: number = 0;
  classTimeId: number = 0; // Store selected class time
  totalAmount: number = 50; // Assuming this is a fixed amount for now
  userId: number = 0; // User ID from local storage
  classTimes: any[] = []; // Store class times
  ClassDetails: any; // Store class details

  constructor(
    private _ser: UrlServiceService,
    private _rout: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe // Inject the DatePipe
  ) { }

  ngOnInit() {
    this.classId = Number(this._rout.snapshot.paramMap.get("id"));
    this.getClassById(this.classId);
    this.getClassTimes(this.classId);

    // Check if user is logged in
    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
    }
  }

  // Fetch class details by ID
  getClassById(id: any) {
    this._ser.getClassById(id).subscribe((data) => {
      this.ClassDetails = data;
      this.totalAmount = this.ClassDetails.price;

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

  // Format the date
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return this.datePipe.transform(date, 'shortTime') || ''; // Formats time to 'h:mm a'
  }

  // Handle class time selection
  onClassTimeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.classTimeId = +selectElement.value; // Set classTimeId to the selected value
  }

  joinClass() {
    if (!this.classTimeId) {
      alert('Please select a time before joining.');
      return;
    }

    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      this.router.navigate(['/Login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    this._ser.createClassEnrollment(this.userId, this.classId, this.classTimeId, this.totalAmount).subscribe(
      response => {

        // Store the total amount in local storage
        localStorage.setItem('totalAmount', this.totalAmount.toString());

        // Redirect to the payment page with parameters
        this.router.navigate(['/payment'], {
          queryParams: { classId: this.classId, classTimeId: this.classTimeId }
        });
      },
      error => {
        console.error('Error enrolling in class', error);
        alert('Error enrolling in class. Please try again.');
      }
    );
  }
}
