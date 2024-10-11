import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UrlService } from '../yousefurl/url.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contactForm: FormGroup;

  constructor(private urlService: UrlService, private fb: FormBuilder) {
    // Initialize the form with validation
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.urlService.postContactForm(this.contactForm.value).subscribe(
        response => {
          console.log('Message sent successfully', response);
          // You can handle success response here (e.g., show a message)
        },
        error => {
          console.error('Error sending message', error);
          // Handle the error response here
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }

}
