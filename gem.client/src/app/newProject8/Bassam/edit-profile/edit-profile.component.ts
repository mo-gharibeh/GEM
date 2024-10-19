import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BassamUrlService } from '../BassamUrl/bassam-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  user: any = {};
  userId: number | undefined;
  updateForm!: FormGroup; // Define form
  selectedFile: File | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef; // Reference to the file input

  constructor(
    private fb: FormBuilder,
    private bassamUrlService: BassamUrlService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.userId = idParam ? +idParam : undefined;

    // Initialize form
    this.updateForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      PhoneNumber: ['', Validators.required],
      Address: ['', Validators.required],
      OldPassword: ['', Validators.required],
      NewPassword: ['', Validators.required],
      ConfirmPassword: ['', Validators.required]
    });

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
          this.user = data;
          this.updateForm.patchValue(data); // Auto-populate the form
        },
        (error: HttpErrorResponse) => {
          console.error('Error loading user profile:', error);
        }
      );
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]; // Store the selected file
  }

  // Method to trigger the file input
  triggerFileInput(): void {
    this.fileInput.nativeElement.click(); // Trigger the file input click event
  }

  onSubmit(): void {
    this.updateProfile();  // Call the updateProfile method when the form is submitted
  }

  updateProfile(): void {
    if (this.updateForm.value.NewPassword !== this.updateForm.value.ConfirmPassword) {
      console.error('Passwords do not match.');
      return;
    }

    const formData = new FormData();
    formData.append('FirstName', this.updateForm.get('FirstName')?.value);
    formData.append('LastName', this.updateForm.get('LastName')?.value);
    formData.append('PhoneNumber', this.updateForm.get('PhoneNumber')?.value);
    formData.append('Address', this.updateForm.get('Address')?.value);
    formData.append('Password', this.updateForm.get('NewPassword')?.value)

    if (this.selectedFile) {
      debugger;
      formData.append('Image', this.selectedFile); // Append image if selected
    }

    if (this.userId !== undefined) {
      this.bassamUrlService.updateUserProfile(this.userId, formData).subscribe(
        () => {
          alert('Profile updated successfully');
          this.router.navigate(['/Profile']);

          console.log('Profile updated successfully');
        },
        (error: HttpErrorResponse) => {
          console.error('Error updating user profile:', error);
        }
      );
    }
  }
}
