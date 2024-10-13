import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrl: './update-products.component.css'
})
export class UpdateProductsComponent {

  param: any
  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')
    //start ponit of lifecycle of angular when we make a refresh or reload will go to ngonit
  }
  constructor(private _ser: DimaUrlServiceService, private _active: ActivatedRoute, private _router: Router) {


  }
  imageFile: File | null = null;

  // Capture the selected file from the file input
  changeImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0]; // Get the selected file
      console.log('Selected image:', this.imageFile); // Log the image to ensure it's captured
    }
  }

  UpdateProducts(data: any) {
    const form = new FormData();

    // Append all form data fields
    for (let key in data) {
      form.append(key, data[key]);
    }

    // Append the image file if it has been selected
    if (this.imageFile) {
      form.append('ProductsImage', this.imageFile); // Key should match the backend expectation
    } else {
      console.error('No image file selected');
    }

    this._ser.updateProduct(this.param, form).subscribe(
      response => {
        alert('Product updated successfully');
        this._router.navigate(['AdminDashBoard/GetCategories']);
      },
      error => {
        console.error('Error updating product:', error);
      }
    );
  }
}
