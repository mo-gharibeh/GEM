import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';

@Component({
  selector: 'app-show-all-orders',
  templateUrl: './show-all-orders.component.html',
  styleUrl: './show-all-orders.component.css'
})
export class ShowAllOrdersComponent {
  ngOnInit() {

    this.GetOrders();
  }
  constructor(private _ser: DimaUrlServiceService) {


  }

  Array: any
  GetOrders() {
    this._ser.getOrder().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.categoryArray")
    })

  }

}
