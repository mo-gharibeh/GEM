import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
  
  constructor(private http: HttpClient) { }
  staticData = "https://localhost:44340/api";

    addUserRegistration(data: any): Observable <any> {
      return this.http.post<any>(`${this.staticData }/Ahmed/Register`, data)
    }

    loginUser(data: any): Observable <any> {
      return this.http.post<any>(`${this.staticData}/Ahmed/Login`, data)
    }

}
