import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BassamUrlService {
  private baseUrl = 'https://localhost:44340/api'; // Ensure this matches your backend API URL

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/UsersBassam/${id}`);
  }

  updateUserProfile(userId: number, formData: FormData): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/UsersBassam/edit-profile/${userId}`, formData);
  }

  getImage(image: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/getImages/${image}`, { responseType: 'blob' });
  }

  getOrders(userId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/UsersBassam/getOrder?userId=${userId}`);
  }

  getOrderItems(orderId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/UsersBassam/GetorderItemByOrderId/${orderId}`);
  }
  getUserSubscriptions(userId: number): Observable<any[]> {
  debugger;
    return this.http.get<any[]>(`${this.baseUrl}/UsersBassam/getUserSubscriptions/${userId}`);
  }
}
