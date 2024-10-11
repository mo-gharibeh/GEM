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
  userId: number = 2; // Use the logged-in user's ID, replace with dynamic value later
  cartId: number = 2;

  constructor(private _ser: LujainURLService) { }

  ngOnInit() {
    this.loadCartFromLocalStorage();
    this.getCartItems();
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
  calculateTotalPrice(price: number, quantity: number): number {
    return price * quantity;
  }

    // Increment the quantity and update it in the database
  increment(cartItemId: any) {
    console.log("in cartItemId:", cartItemId);  // Debugging

    const item = this.Array.find(item => item.productId == cartItemId);
    if (item) {
      this._ser.increaseQuantity(this.userId, cartItemId);
    }
  }

  // Decrement the quantity and update it in the database
  decrement(cartItemId: any) {
    console.log("Decrementing cartItemId:", cartItemId);  // Debugging

    const item = this.Array.find(item => item.productId == cartItemId);
    if (item && item.quantity > 1) {
      this._ser.decreaseQuantity(this.userId, cartItemId);
    } else if (item && item.quantity <= 1) {
      alert("The quantity cannot be less than 1.");
    }
  }
  deleteItem(id: any) {
    this.Array = this.Array.filter(item => item.productId !== id); 
    this._ser.removeItem(id); 
  }

  calculateSubtotal(): number {
    return this.Array.reduce((acc, item) => {
      return acc + this.calculateTotalPrice(item.price, item.quantity);
    }, 0);
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const shippingCost = subtotal > 100 ? 0 : this.shippingCost;
    return subtotal + shippingCost;
  }
}
