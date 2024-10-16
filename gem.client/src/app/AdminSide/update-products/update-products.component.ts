import { Component, OnInit } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {
  param: any;
  imageFile: File | null = null;
  categories: any[] = []; // Array to hold category data
  selectedCategoryId: number | null = null; // Selected category ID
  productData: any = {}; // Object to hold the product data

  constructor(
    private _ser: DimaUrlServiceService,
    private _active: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    this.loadCategories(); // Load categories when component initializes
    this.loadProductData(); // Load the product data for editing
  }

  // Method to load categories from the service
  loadCategories() {
    this._ser.getCategory().subscribe(
      (response: any) => {
        this.categories = response; // Assuming the response is an array of categories
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  // Load the product data based on the ID from the route
  loadProductData() {
    this._ser.getProductById(this.param).subscribe(
      (response: any) => {
        this.productData = response;
      },
      (error) => {
        console.error('Error fetching product data:', error);
      }
    );
  }

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
      form.append('Image', this.imageFile); // Key should match the backend expectation
    } else {
      console.error('No image file selected');
    }

    this._ser.updateProduct(this.param, form).subscribe(
      (response) => {
        alert('Product updated successfully');
        this._router.navigate(['AdminDashBoard/GetProducts']);
      },
      (error) => {
        console.error('Error updating product:', error);
      }
    );
  }
}
