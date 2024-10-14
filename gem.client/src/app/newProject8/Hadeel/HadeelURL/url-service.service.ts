import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  staticData = "https://localhost:44340/api";

  constructor(private http: HttpClient) { }

  getGym(): Observable<any> {

    return this.http.get<any>(`${this.staticData}/Gym/ShowAllGyms`);

  }

  getGymDetails(id: any): Observable<any> {
    debugger
    return this.http.get<any>(`${this.staticData}/Gym/ShowGymDetails/${id}`)
  }


  addUSerSubScription(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Subscribtion/AddGymSubscribtion`, data)
  }

  getAllClasses(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classe/GetAllClasses`);
  }
  getClassById(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Classe/GetClasseDetails/${id}`)
  }
  removeClass(id: any): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Classe/DeleteClass?id=${id}`)
  }
  AddService(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Gym/AddGym`, data)
  }

  AddClassService(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Classe/Addclass`, data)
  }

  getClassTimes(classId: number): Observable<any[]> {
  

    return this.http.get<any[]>(`${this.staticData}/Classe/${classId}/times`);
  }
  // Join class with selected time and user ID
  joinClass(classId: number, timeId: number, userId: number): Observable<any> {

    return this.http.post(`${this.staticData}/Classe/${classId}/join`, { timeId, userId });
  }
  UpdateService(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Gym/EditGym?id=${id}`, data)
  }
  remove(id: any): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Gym/DeleteGym?id=${id}`)
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////paypal///////////////////////////////////////////////////
  // Create PayPal payment and get approval URL
  payForClass(classId: number, classTimeId: number): Observable<string> {
    debugger
    const userId = Number(localStorage.getItem('userId'));  // Get the user ID from local storage
    const paymentInfo = {
      returnUrl: `${window.location.origin}/payment-success`,  // Success URL after payment
      cancelUrl: `${window.location.origin}/payment-cancel`    // Cancel URL if the payment fails
    };
    debugger
    return this.http.post<string>(`${this.staticData}/Payment/CheckoutWithPayPal/${userId}/${classId}/${classTimeId}`, paymentInfo);
  }

  // Execute PayPal payment after approval
  executePayPalPayment(paymentId: string, payerId: string, classId: number, classTimeId: number): Observable<any> {
    debugger
    const userId = Number(localStorage.getItem('userId'));  // Get the user ID from local storage
    debugger
    const paymentExecution = {
      paymentId,
      payerId,
      userId,
      classId,
      classTimeId
    };
    debugger
    return this.http.post<any>(`${this.staticData}/Payment/ExecutePayPalPayment`, paymentExecution);
  }
}
  

 
