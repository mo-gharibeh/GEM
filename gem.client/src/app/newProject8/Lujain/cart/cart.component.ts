import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  ngOnInit() {

    this.getCartITems();
  }
  constructor(private _ser: LujainURLService) {


  }
  Array: any
  getCartITems() {
    debugger;
    this._ser.cartItemObser.subscribe((data) => {
      this.Array = data
      console.log("Cart items:", this.Array);

    })

  }
  increament(id: any) {
    this._ser.increaseQuantity(id);

  }
  decremeant(id: any) {
    this._ser.decreaseQuantity(id);

  }
}
