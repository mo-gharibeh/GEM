import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private apiUrl = 'https://localhost:44340/api';

  constructor(private http: HttpClient) { }

  
  postContactForm(contactFormData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/ContactController1/PostMessage`, contactFormData);
    0
  }
}
