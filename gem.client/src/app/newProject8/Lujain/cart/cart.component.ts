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
