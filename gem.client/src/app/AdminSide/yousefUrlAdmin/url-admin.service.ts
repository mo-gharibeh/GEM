import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlAdminService {

  private apiUrl = 'https://localhost:44340/api';

  constructor(private http: HttpClient) { }


  getComents(): Observable<any> {
    return this.http.get(`${this.apiUrl}/ContactController1/GetMessage`);
  }
  getComentsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ContactController1/GetMessage/${id}`);
  }

  postContactForm(contactFormData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ContactController1/PostMessageToEmail`, contactFormData);

  }

}
