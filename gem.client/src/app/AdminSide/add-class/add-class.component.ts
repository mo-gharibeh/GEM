import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'] // Fixed 'styleUrl' to 'styleUrls'
})
export class AddClassComponent {

  imageFile: any;

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
  }

  constructor(private _ser: UrlServiceService, private _router: Router) { }

  AddNewService(data: any) {
    const formdata = new FormData();

    for (const item in data) {
      if (data.hasOwnProperty(item)) {
        formdata.append(item, data[item]);
      }
    }

    if (this.imageFile) {
      formdata.append("Image", this.imageFile);
    }

    console.log('Form data to be sent:', formdata); // Log the form data

    this._ser.AddClassService(formdata).subscribe({
      next: () => {
        alert("Class added successfully!");
        this._router.navigate(['/AdminDashBoard/ShowClass']);
      },
      error: (err) => {
        console.error('Error adding class:', err); // Log the error for debugging
        const errorMessage = this.getErrorMessage(err);
        alert("An error occurred: " + errorMessage);
      }
    });
  }

  private getErrorMessage(error: any): string {
    // Check if the error has a message or if it is an object with details
    if (error.error && typeof error.error === 'object') {
      return error.error.message || JSON.stringify(error.error);
    } else if (error.message) {
      return error.message;
    } else {
      return 'Unknown error occurred';
    }
  }
}
