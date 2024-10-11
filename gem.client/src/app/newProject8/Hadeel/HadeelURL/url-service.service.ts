import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  staticData = "http://localhost:5062/api";

  constructor(private http: HttpClient) { }

  getGym(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/ShowAllGyms`);

  }

  getGymDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Gym/ShowGymDetails?id=${id}`)
  }
}
