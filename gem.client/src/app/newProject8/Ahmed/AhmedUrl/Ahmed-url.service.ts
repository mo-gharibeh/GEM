import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AhmedUrlService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:44340/api";
  //staticData = "https://localhost:7031/api";



  //email: BehaviorSubject<string> = new BehaviorSubject<string>("")
  //emailaddress = this.email.asObservable();

  addUserRegistration(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Ahmed/Register`, data)
  }

  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Ahmed/Login`, data)
  }
  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Ahmed/GetAllUsers`);
  }

}
