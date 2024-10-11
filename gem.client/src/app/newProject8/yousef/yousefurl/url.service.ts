import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private apiUrl = 'https://localhost:44340/api/ContactController1/PostMessage';

  constructor(private http: HttpClient) { }

  // Method to post contact form data
  postContactForm(contactFormData: any): Observable<any> {
    return this.http.post(this.apiUrl, contactFormData);

  }
}
