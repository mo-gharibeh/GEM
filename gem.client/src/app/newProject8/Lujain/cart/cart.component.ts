import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  Array: any[] = []; // Holds the cart items
  shippingCost: number = 5; // Fixed shipping cost

  constructor(private _ser: LujainURLService) { }

  ngOnInit() {
    this.getCartItems();
  }

  getCartItems() {
    this._ser.cartItemObser.subscribe((data) => {
      this.Array = data;
      console.log("Cart items:", this.Array);
    });
  }

  // Calculate total price for individual items
  calculateTotalPrice(price: number, quantity: number): number {
    return price * quantity;
  }

  increment(id: any) {
    const item = this.Array.find(item => item.productId === id);
    if (item) {
      this._ser.increaseQuantity(id);
    }
  }

  decrement(id: any) {
    const item = this.Array.find(item => item.productId === id);
    if (item && item.quantity > 1) {
      this._ser.decreaseQuantity(id);
    } else if (item && item.quantity <= 1) {
      alert("The quantity cannot be less than 1.");
    }
  }

  // Calculate subtotal for all items in the cart
  calculateSubtotal(): number {
    return this.Array.reduce((acc, item) => {
      return acc + this.calculateTotalPrice(item.price, item.quantity);
    }, 0);
  }

  // Calculate total cost (subtotal + shipping, with condition for free shipping)
  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const shippingCost = subtotal > 100 ? 0 : this.shippingCost;
    return subtotal + shippingCost;
  }
}
