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
    this.userId = 1; // Set the user ID; ideally, this should be dynamic (e.g., from route params)
    this.loadUserData(this.userId);
  }

  loadUserData(userId: number): void {
    this._ser.getUser(userId).subscribe(
      (data) => {
        debugger;
        this.user = data; // Store the received user data
        if (this.user.image) {
          // Construct the URL for the image
/*          this.getImage(this.user.image);*/
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching user data', error);
      }
    );
  }


  //getImage(image: string): void {
  //  this._ser.getImage(image).subscribe(
  //    (blob) => {
  //      debugger;
  //      // Create a local URL for the image blob
  //      const objectUrl = URL.createObjectURL(blob);
  //      this.imageUrl = objectUrl; // Set the image URL
  //    },
  //    (error: HttpErrorResponse) => {
  //      console.error('Error fetching image', error);
  //    }
  //  );
  //}

  // Method to navigate to edit profile page
  editProfile(): void {
    if (this.userId !== undefined) {
      this._router.navigate(['/edit-profile', this.userId]); // Navigate to edit profile page with user ID
    } else {
      console.error('User ID is undefined, cannot navigate to edit profile');
    }
  }
  Orders(): void {
    this._router.navigate(['/orders']); // Navigate to OrdersComponent
  }
}
