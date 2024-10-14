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
  //staticData = "https://localhost:7031/api"

  getTopProduct(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/top-products`);
  }

  getVisibleTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/VisibleTestimonials`)
  }

  getAllTestimonials(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/AllTestimonials`)
  }
  changeStatus(id: number): Observable<any> {
    return this.http.put(`${this.staticData}/MohammadController1/ChangeStatus/${id}`, {});
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.staticData}/MohammadController1/Delete/${id}`);
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

  AddMeal(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/CategoryController1/addCategory`, data);

  }

  getMeals(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/Meal`);
  }

  addMeal(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/MohammadController1/addMeal`, data);
  }

  updateMeal(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/MohammadController1/editMeal/${id}`, data);
  }

  deleteMeal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/MohammadController1/deleteMeal/${id}`);
  }

  //subMeal
  getSubMeals(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/MohammadController1/getAllSubMeals`);
  }

  addSubMeal(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.staticData}/MohammadController1/addSubMeal`, data);
  }

  updateSubMeal(id: number, data: FormData): Observable<any> {
    return this.http.put<any>(`${this.staticData}/MohammadController1/editSubMeal/${id}`, data);
  }

  deleteSubMeal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/MohammadController1/deleteSubMeal/${id}`);
  }
}
