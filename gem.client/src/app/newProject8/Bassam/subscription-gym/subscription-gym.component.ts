import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BassamUrlService } from '../BassamUrl/bassam-url.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscription-gym',
  templateUrl: './subscription-gym.component.html',
  styleUrls: ['./subscription-gym.component.css'], // Fix the styleUrls array
})
export class SubscriptionGymComponent implements OnInit, OnDestroy {
  userId: number = 1; // Default user ID, can be changed dynamically
  subscriptions: any[] = []; // Array to store subscriptions
  private subscription: Subscription | null = null; // Initialize to null

  constructor(
    private route: ActivatedRoute,
    private bassamUrlService: BassamUrlService
  ) { }

  ngOnInit(): void {
    // Get the user ID from localStorage (ensure you stored it as a string)
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId; // Convert to number if found
    }

    this.getUserSubscriptions(this.userId); // Fetch the user's subscriptions
  }

  // Function to fetch subscriptions using the service
  getUserSubscriptions(userId: number): void {
    this.subscription = this.bassamUrlService.getUserSubscriptions(userId).subscribe(
      (data) => {
        this.subscriptions = data; // Store the fetched data
      },
      (error) => {
        console.error('Error fetching subscriptions', error); // Log any errors
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe(); // Unsubscribe on component destruction
    }
  }

  // Method to check if a subscription is active
  isActive(startDate: Date | null, endDate: Date | null): boolean {
    const now = new Date();
    return startDate ? startDate <= now && (!endDate || endDate >= now) : false;
  }
}
