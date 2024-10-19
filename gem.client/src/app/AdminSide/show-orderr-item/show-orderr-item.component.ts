import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-orderr-item',
  templateUrl: './show-orderr-item.component.html',
  styleUrl: './show-orderr-item.component.css'
})
export class ShowOrderrItemComponent {

  parameter: any
  Array: any
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getorderItem(this.parameter);
    this.getProducts();
  }
  suborderData: any
  products: any[] = [];

  constructor(private _ser: DimaUrlServiceService, private _route: ActivatedRoute) { }
  getorderItem(id: any) {
    this._ser.GetOrderItem(id).subscribe((data) => {
      this.suborderData = data
      console.log("this.suborderData", this.suborderData)
    })



  }
  getProducts() {
    this._ser.getProduct().subscribe((data) => {
      this.products = data;
      console.log("this.products", this.products);
      //this.mapProductNames();
    });
  }


  //mapProductNames() {
  //  if (this.suborderData.length && this.products.length) {
  //    this.suborderData.forEach((item: any) => {
  //      const product = this.products.find(p => p.productId === item.productId);
  //      if (product) {
  //        item.productName = product.productName;
  //      }
  //    });
  //  }
  //}
}
