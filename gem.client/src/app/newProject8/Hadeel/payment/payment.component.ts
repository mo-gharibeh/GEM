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
export class PaymentComponent implements OnInit {
  classId: number = 0;
  classTimeId: number = 0;
  totalAmount: number = 50; // Set default amount if needed
  selectedTime: number | 0 = 0;
  userId: number = 0;
  classTimes: any[] = [];
  ClassDetails: any;

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
    this.classTimeId = +selectElement.value;
  }

  // Join class and save enrollment
  joinClass() {
    if (!this.classTimeId) {
      alert('Please select a time before joining.');
      return;
    }

    this.userId = Number(localStorage.getItem('userId'));
    if (!this.userId) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    // Call the service method to save enrollment
    this._ser.joinClass(this.classId, this.classTimeId, this.userId, this.totalAmount).subscribe(
      response => {
        // Handle successful enrollment
        console.log('Enrollment created successfully', response);
        alert('You have successfully enrolled in the class!');
        // Optionally, navigate to another page or update the UI
      },
      error => {
        // Handle error
        console.error('Error creating enrollment', error);
        alert('Error enrolling in class. Please try again.');
      }
    );
  }
}
