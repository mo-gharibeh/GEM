import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  ProductArray: any;

  constructor(private _ser: LujainURLService) { }

  ngOnInit() {
    this.getProductFit();
  }

  getProductFit() {
    this._ser.getProduct().subscribe((data) => {
      this.ProductArray = data;
      console.log("Fetched services data:", this.ProductArray);
    });
  }
}
