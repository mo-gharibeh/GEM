import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  ProductArray: any;
  count: any;
  paramter: any;
  productCategory: any;
  CategoryArry: any;



  //userId: number | null = null;  

  userId: number = 2;  // Static userId for now, replace later with localStorage



  constructor(private _ser: LujainURLService, private _router: ActivatedRoute) { }

  ngOnInit() {
    this.getProductFit();
    this.getProductCount();
    this.getCategories();






    this.paramter = this._router.snapshot.paramMap.get("id");
    this.checkUserStatus();


    //this.userId = localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId')!, 10) : null;

    //if (this.userId) {
    //  this.syncCartWithDatabase(this.userId);
    //}
  }
  checkUserStatus() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);  // Later, replace static value with localStorage
    }
  }

  getProductFit() {
    this._ser.getProduct().subscribe((data) => {
      this.ProductArray = data;
      console.log("Fetched services data:", this.ProductArray);
    });

  }

  getCategories() {
    this._ser.getCategory().subscribe((data) => {
      this.CategoryArry = data;
      console.log("Fetched services data:", this.CategoryArry);
    });

  }



  getProductCount() {
    this._ser.getCount().subscribe((data) => {
      this.count = data;
      console.log("Fetched services data:", this.count);
    });
  }
  getProductCategory(id: any) {

    if (id === null) {
      // Fetch all products when "All Products" is clicked
      this.getProductFit(); // Fetch all products
    } else {
      // Fetch products for the selected category
      this._ser.getProductByCategory(id).subscribe((data: any) => {
        this.ProductArray = data; // Update the products array with filtered products
        console.log("Fetched Products data:", this.ProductArray);
      });
    }
  }


  
  object = {
    cartItem: 0,
    productId: 0,
    userId: this.userId ,//|| 0,
    quantity: 1, 
    productName: "", // Add productName
    price: 0,
    image: "",
   
  };

  addtoCart(productId: any) {
    const product = this.ProductArray.find((item: any) => item.productId === productId);

    if (product) {
      this.object.productId = product.productId;
      this.object.productName = product.productName;
      this.object.price = product.price;

      // Set a static cartItemId for testing
      const staticCartItemId = 2; // Replace this with any static ID you want to use
      this.object.cartItem = staticCartItemId;

      this.object.image = product.image;
      this.object.userId = this.userId;

      this._ser.addTocart({ ...this.object });

      alert("Item added to the cart successfully!");
    } else {
      alert("Product not found");
    }
  }


  
  syncCartWithDatabase(userId: number) {
    this._ser.pushCartToDatabase(userId).subscribe(
      (response) => {
        console.log('Cart synced with database:', response);
      },
      (error) => {
        console.error('Failed to sync cart with database:', error);
      }
    );
  }


}
