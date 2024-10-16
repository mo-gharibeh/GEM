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
    this._ser.getOrder().subscribe(
      (data) => {
        this.Array = data;
        console.log(this.Array, "Orders Array");
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  onStatusChange(orderId: number, event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;

    console.log("Order ID:", orderId, "New Status:", newStatus);

    if (orderId && newStatus) {
      const orderToUpdate = this.Array.find((item: any) => item.orderId === orderId);
      if (orderToUpdate) {
        orderToUpdate.shippingStatus = newStatus;
      }

      this.updateOrderStatus(orderId, newStatus);
    } else {
      console.error('Invalid orderId or status!');
    }
  }

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
