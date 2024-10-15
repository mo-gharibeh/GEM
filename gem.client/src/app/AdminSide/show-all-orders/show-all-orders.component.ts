import { Component, OnInit } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';

@Component({
  selector: 'app-show-all-orders',
  templateUrl: './show-all-orders.component.html',
  styleUrls: ['./show-all-orders.component.css']
})
export class ShowAllOrdersComponent implements OnInit {
  Array: any;

  constructor(private _ser: DimaUrlServiceService) { }

  ngOnInit() {
    this.GetOrders();
  }

  // Fetch all orders
  GetOrders() {
    this._ser.getOrder().subscribe((data) => {
      this.Array = data;
      console.log(this.Array, "Orders Array");
    });
  }

  // Set the status and trigger update when dropdown item is clicked
  setStatus(orderId: number, newStatus: string) {
    console.log("Order ID:", orderId, "New Status:", newStatus);

    // Check if the newStatus is valid before calling updateOrderStatus
    if (orderId && newStatus) {
      this.updateOrderStatus(orderId, newStatus);
    } else {
      console.error('Invalid orderId or status!');
    }
  }

  // Update order status when dropdown is changed
  updateOrderStatus(orderId: number, newStatus: string) {
    this._ser.updateOrderStatus(orderId, newStatus).subscribe(
      (response) => {
        console.log('Order status updated successfully:', response);
      },
      (error) => {
        console.error('Error updating order status:', error);
      }
    );
  }
}
