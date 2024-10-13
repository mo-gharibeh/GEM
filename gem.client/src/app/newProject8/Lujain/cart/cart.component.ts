import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Array: any[] = [];
  shippingCost: number = 5;
  userId: number = 0;

  constructor(private _ser: LujainURLService) { }

  ngOnInit() {
    this.loadCartFromLocalStorage();
    this.getCartItems();

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);

      this._ser.getCartItem(this.userId).subscribe(
        (cartData) => {
          if (cartData && cartData.length > 0) {
            this.Array = cartData;
            this._ser.cartITemSubject.next(this.Array);
          } else {
            this.syncLocalCartToDatabase(this.userId);
          }
        },
        (error) => {
          console.error("Failed to fetch cart items from the database:", error);
          this.syncLocalCartToDatabase(this.userId);
        }
      );
    }
  }

  getCartItems() {
    this._ser.cartItemObser.subscribe((data) => {
      this.Array = data;
      console.log("Cart items:", this.Array);
    });
  }

  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
      this.Array = JSON.parse(storedCart);
      this._ser.cartITemSubject.next(this.Array);
    }
  }

  syncLocalCartToDatabase(userId: number) {
    this._ser.syncLocalCartToDatabase(userId);
  }

  calculateTotalPrice(price: number, quantity: number): number {
    return price * quantity;
  }
  increment(cartItemId: any) {
    // Find the item in the Array by cartItemId
    const item = this.Array.find(item => item.cartItemId === cartItemId);
    if (item) {
      item.quantity += 1; // Increment the quantity
      localStorage.setItem('cartItems', JSON.stringify(this.Array)); // Update local storage

      // If the user is logged in, update the database as well
      if (this.userId !== 0) {
        this._ser.editCartItem(this.userId, item.cartItemId, item.quantity).subscribe(
          (response) => {
            console.log("Quantity increased successfully:", response);
          },
          (error) => {
            console.error("Failed to increase quantity:", error);
          }
        );
      }
    }
  }

  decrement(cartItemId: any) {
    const item = this.Array.find(item => item.cartItemId === cartItemId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(this.Array));

      if (this.userId !== 0) {
        this._ser.editCartItem(this.userId, item.cartItemId, item.quantity).subscribe(
          (response) => {
            console.log("Quantity decreased successfully:", response);
          },
          (error) => {
            console.error("Failed to decrease quantity:", error);
          }
        );
      }
    } else if (item && item.quantity <= 1) {
      alert("The quantity cannot be less than 1.");
    }
  }


  incrementByProductId(productId: any) {
    const item = this.Array.find(item => item.productId === productId);
    if (item) {
      item.quantity += 1;
      localStorage.setItem('cartItems', JSON.stringify(this.Array));
    }
  }

  decrementByProductId(productId: any) {
    const item = this.Array.find(item => item.productId === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      localStorage.setItem('cartItems', JSON.stringify(this.Array));
    } else if (item && item.quantity <= 1) {
      alert("The quantity cannot be less than 1.");
    }
  }


  deleteItem(cartItemId: any) {
    this._ser.deleteCartItem(this.userId, cartItemId).subscribe(
      (response) => {
        console.log("Item deleted successfully:", response);

        this.Array = this.Array.filter(item => item.cartItemId !== cartItemId);
        this._ser.cartITemSubject.next(this.Array);
        localStorage.setItem('cartItems', JSON.stringify(this.Array));
      },
      (error) => {
        console.error("Failed to delete item:", error);
      }
    );
  }

  deleteProduct(productId: any) {
    this.Array = this.Array.filter(item => item.productId !== productId);
    this._ser.cartITemSubject.next(this.Array);
    localStorage.setItem('cartItems', JSON.stringify(this.Array));
  }


  calculateSubtotal(): number {
    return this.Array.reduce((acc, item) => acc + this.calculateTotalPrice(item.price, item.quantity), 0);
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const shippingCost = subtotal > 100 ? 0 : this.shippingCost;
    return subtotal + shippingCost;
  }
}
