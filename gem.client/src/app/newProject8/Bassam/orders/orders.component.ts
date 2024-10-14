import { Component, OnInit } from '@angular/core';
import { BassamUrlService } from '../BassamUrl/bassam-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user: any = {};  // To store user data
  orders: any[] = [];  // To store fetched orders
  userId: number | undefined;  // To store user ID
  orderId: number | undefined;  // To store the order ID

  constructor(private bassamUrlService: BassamUrlService, private _router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('userId');  // Get the userId from the route params
    this.userId = idParam ? +idParam : undefined;  // Convert userId to number

    if (this.userId) {
      this.getOrders1(this.userId);    // Fetch orders using the userId
    } else {
      console.error('User ID not found in route parameters.');
    }
  }

  // Fetch orders based on userId
  getOrders1(userId: number): void {
    this.bassamUrlService.getOrders(userId).subscribe(
      (data) => {
        this.orders = data;  // Store fetched orders
        console.log('Orders fetched successfully:', this.orders);
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }

  // Navigate to the order items page for a specific orderId
  viewOrderItems(orderId: number): void {
    this._router.navigate(['/order-items-bassam', orderId]);  // Navigate to order-items page
  }
}
