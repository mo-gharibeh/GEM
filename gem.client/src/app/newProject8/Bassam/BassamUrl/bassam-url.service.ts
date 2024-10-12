import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BassamUrlService {
  private baseUrl = 'https://localhost:44340/api';

  constructor(private http: HttpClient) { }

  getUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/UsersBassam/${id}`);
  }

  updateUserProfile(userId: number, userProfileUpdateDto: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/Users/edit-profile/${userId}`, userProfileUpdateDto);
  }
}
