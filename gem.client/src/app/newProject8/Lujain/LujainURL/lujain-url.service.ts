import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LujainURLService {

  staticData = "https://localhost:44340/api";

  constructor(private http: HttpClient) { }


  getTips(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/Tips`);
  }
  getMeal(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/Meal`);

  }

  getSubMeal(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/SubMeal/${id}`);
  }

  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/GetProducts`);
  }

  getCount(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/Count`);
  }

  getProductByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/ProductsbyCategoryId/${id}`);
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CategoryController1/Category`);
  }



  
}


