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

  constructor(private _ser: BassamUrlService, private _router: Router) { }

  ngOnInit(): void {
    // Example: Fetch user with a valid ID, could be obtained from route params in a real scenario
    this.userId = 1; // Set the user ID; ideally, this should be dynamic (e.g., from route params)
    this.loadUserData(this.userId);
  }

  loadUserData(userId: number): void {
    this._ser.getUser(userId).subscribe(
      (data) => {
        this.user = data; // Store the received user data
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
        // Optionally, navigate to an error page or display a user-friendly message
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
}
