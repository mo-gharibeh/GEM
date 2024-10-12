import { Component, OnInit } from '@angular/core';
import { BassamUrlService } from '../BassamUrl/bassam-url.service';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userId: number | undefined; // Allow userId to be undefined initially
  user: any = {}; // Initialize user object
  passwordMismatch: boolean = false; // Flag for password mismatch error
  confirmPassword: string = ''; // Confirm password

  constructor(
    private bassamUrlService: BassamUrlService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : undefined;

    if (this.userId !== undefined) {
      this.loadUserProfile();
    } else {
      console.error('User ID not found in route parameters');
    }
  }

  loadUserProfile(): void {
    if (this.userId !== undefined) {
      this.bassamUrlService.getUser(this.userId).subscribe(
        data => {
          this.user = data; // Fill the user object with user data
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading user profile:', error);
        }
      );
    }
  }

  updateProfile(): void {
    if (this.passwordMismatch) {
      console.error('Passwords do not match.');
      return; // Do not proceed if passwords do not match
    }

    this.bassamUrlService.updateUserProfile(this.userId!, this.user).subscribe(
      () => {
        console.log('Profile updated successfully');
        // Optionally, you can redirect or show a success message
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating user profile:', error);
      }
    );
  }

  checkPasswordMatch(): void {
    this.passwordMismatch = this.user.Password !== this.confirmPassword;
  }
}
