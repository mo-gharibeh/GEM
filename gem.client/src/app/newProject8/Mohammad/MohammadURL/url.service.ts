import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  getComents() {
      throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient) { }

  staticData = "https://localhost:44340/api"

  getTopProduct(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/top-products`);
  }

  getAllTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/Testimonials`)
  }

  // Method to check if the user should be prompted for a testimonial
  checkSubscriptionAndPromptTestimonial(userId: number): Observable<any> {
    return this.http.get(`${this.staticData}/MohammadController1/CheckSubscriptionAndPromptTestimonial/${userId}`);
  }

  submitTestimonial(testimonial: { userId: any, text: string }): Observable<any> {
    return this.http.post(`${this.staticData}/MohammadController1/SubmitTestimonial`, testimonial);
  }

  getSubMealNutrition(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/${id}`);
  }

}
