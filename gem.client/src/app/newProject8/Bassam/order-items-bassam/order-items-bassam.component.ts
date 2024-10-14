import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BassamUrlService } from '../BassamUrl/bassam-url.service'; // Ensure the correct import path

@Component({
  selector: 'app-order-items-bassam',
  templateUrl: './order-items-bassam.component.html',
  styleUrls: ['./order-items-bassam.component.css']
})
export class OrderItemsBassamComponent implements OnInit {
  orderId: number | undefined;
  orderItems: any[] = [];

  constructor(private route: ActivatedRoute, private bassamUrlService: BassamUrlService) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('orderId');
    this.orderId = idParam ? +idParam : undefined;

    if (this.orderId) {
      this.getOrderItems(this.orderId); // Fetch order items based on the ID
    } else {
      console.error('Order ID not found in route parameters.');
    }
  }

  getOrderItems(orderId: number): void {
    this.bassamUrlService.getOrderItems(orderId).subscribe(
      (data) => {
        this.orderItems = data; // Store fetched data
        console.log(this.orderItems);
      },
      (error) => {
        console.error('Error fetching order items', error);
      }
    );
  }
}
