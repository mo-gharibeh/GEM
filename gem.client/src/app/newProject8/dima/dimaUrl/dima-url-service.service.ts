import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DimaUrlServiceService {
  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7031/api";

  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CategoryController1/Category`);
  }

  //https://localhost:44340/api/CategoryController1/4
  //  https://localhost:44340/api/CategoryController1/addCategory

  deleteCategory(categoryId: number): Observable<any> {
    return this.http.delete(`${this.staticData}/CategoryController1/${categoryId}`);
  }

  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put(`${this.staticData}/CategoryController1/UpdateCategory/${id}`, data)

  }


  AddCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/CategoryController1/addCategory`, data);

  }

  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/GetProducts`);
  }


  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${this.staticData}/Products/DeleteProduct/${productId}`);
  }



  updateProduct(id: any, data: any): Observable<any> {
    return this.http.put(`${this.staticData}/Products/updateProduct/${id}`, data)

  }


  AddProduct(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Products/addProduct`, data);

  }
}
