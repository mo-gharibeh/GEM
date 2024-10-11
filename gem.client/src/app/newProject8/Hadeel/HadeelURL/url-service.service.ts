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
}
