import { Component } from '@angular/core';
import { UrlService } from '../MohammadURL/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productArray: any;
  testimonialArray: any;
  showTestimonialBox: boolean = false; // متغير لعرض النافذة المنبثقة
  testimonialText: string = ''; // Variable to hold the testimonial text



  ngOnInit() {
    this.get4Product();
    this.getTestimonials();

    //localStorage.getItem('userId')

    const userId = parseInt(localStorage.getItem('userId') ?? '0', 10);
    this.checkSubscriptionAndPromptTestimonial(userId);

  }

  constructor(private _ser: UrlService, private _route: ActivatedRoute) {

  }
  
  get4Product() {
    this._ser.getTopProduct().subscribe((data) => {
      this.productArray = data;
      console.log(this.productArray);
    })
  }

  getTestimonials() {
    this._ser.getVisibleTestimonials().subscribe((data) => {
      this.testimonialArray = data;
      console.log(this.testimonialArray);
    })
  }

  checkSubscriptionAndPromptTestimonial(userId: number) {
    this._ser.checkSubscriptionAndPromptTestimonial(userId).subscribe((response: any) => {
      if (response.showTestimonialPrompt) {
        this.showTestimonialBox = true; // إظهار النافذة المنبثقة إذا كانت النتيجة true
      }
    });
  }

  closeModal() {
    this.showTestimonialBox = false; // Close the modal
  }
  submitTestimonial() {
    if (this.testimonialText.trim()) {
      
      // Call a service method to submit the testimonial to the backend
      this._ser.submitTestimonial({ userId: localStorage.getItem('userId'), text: this.testimonialText }).subscribe(() => {
        alert('Thank you for your feedback!');
        this.closeModal(); // Close the modal after submitting
      });
    } else {
      alert('Please write your testimonial before submitting.');
    }
  }
}

  

