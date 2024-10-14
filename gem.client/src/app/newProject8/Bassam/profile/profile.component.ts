import { Component, OnInit } from '@angular/core';
import { BassamUrlService } from '../BassamUrl/bassam-url.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Initialize user data
  userId: number | undefined; // Variable to hold user ID
  imageUrl: string | undefined; // Variable to hold the image URL

  constructor(private _ser: BassamUrlService, private _router: Router) { }

  ngOnInit(): void {

    // Retrieve the user ID from local storage and parse it to a number
    const storedUserId = localStorage.getItem('userId'); // Ensure you have stored it as a string
    this.userId = storedUserId ? +storedUserId : undefined; // Convert string to number

    if (this.userId) {
      this.loadUserData(this.userId);
    } else {
      console.error('User ID not found in local storage.');
      // Optionally, redirect the user or show a message
      this._router.navigate(['/login']); // Navigate to login or another appropriate page
    }
  }

  loadUserData(userId: number): void {
    this._ser.getUser(userId).subscribe(
      (data) => {
        console.log(data);
        this.user = data; // Store the received user data
        if (this.user.image) {
          // Construct the URL for the image
          // this.getImage(this.user.image); // Uncomment if needed
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
      }
    );
  }

  // Method to navigate to edit profile page
  editProfile(): void {
    if (this.userId !== undefined) {
      this._router.navigate(['/edit-profile', this.userId]); // Navigate to edit profile page with user ID
    } else {
      console.error('User ID is undefined, cannot navigate to edit profile');
    }
  }

  Orders(): void {
    if (this.userId !== undefined) {
      console.log(this.userId);
      this._router.navigate(['/orders', this.userId]); // Navigate to OrdersComponent
    } else {
      console.error('User ID is undefined, cannot navigate to Orders');
    }
  }
}
