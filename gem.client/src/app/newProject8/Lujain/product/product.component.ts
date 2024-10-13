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

  userId: number = 0;

  constructor(private _ser: LujainURLService, private _router: ActivatedRoute) { }

  ngOnInit() {
    this.getProductFit();
    this.getProductCount();
    this.getCategories();

    this.paramter = this._router.snapshot.paramMap.get("id");
    this.checkUserStatus();
  }

  checkUserStatus() {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
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
      this.getProductFit();
    } else {
      this._ser.getProductByCategory(id).subscribe((data: any) => {
        this.ProductArray = data;
        console.log("Fetched Products data:", this.ProductArray);
      });
    }
  }

  object = {
    //cartItem: 0,
    productId: 0,
    userId: this.userId,
    quantity: 1,
    productName: "",
    price: 0,
    image: "",
  };
  addtoCart(productId: any) {
    const product = this.ProductArray.find((item: any) => item.productId === productId);

    if (product) {
      if (this.userId) {
        // Check if the user is logged in
        const existingCartItem = this._ser.cartItem.find((item: any) => item.productId === product.productId);

        if (existingCartItem) {
          // If it exists, increment the quantity
          existingCartItem.quantity += 1;
          this._ser.cartITemSubject.next(this._ser.cartItem); // Notify subscribers about the change
          alert("Quantity updated in the cart!");
        } else {
          // If it doesn't exist, create a new cart item
          this.object.productId = product.productId;
          this.object.productName = product.productName;
          this.object.price = product.price;
          this.object.image = product.image;
          this.object.userId = this.userId || 0;
          this.object.quantity = 1; // Set initial quantity to 1

          this._ser.addTocart({ ...this.object }); // Add the new item to the cart
          alert("Item added to the cart successfully!");
        }
      } else {
        const storedCart = localStorage.getItem('cartItems');
        let cartItems = storedCart ? JSON.parse(storedCart) : [];

        const existingLocalCartItem = cartItems.find((item: any) => item.productId === product.productId);

        if (existingLocalCartItem) {
          // If it exists, increment the quantity
          existingLocalCartItem.quantity += 1;
          alert("Quantity updated");
        } else {

          const newLocalCartItem = {
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            image: product.image,
            quantity: 1
          };

          cartItems.push(newLocalCartItem);
          alert("Item added successfully!");
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    } else {
      alert("Product not found");
    }
  }
}

