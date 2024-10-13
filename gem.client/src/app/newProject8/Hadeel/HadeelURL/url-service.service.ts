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

  AddService(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Gym/AddGym`, data)
  }
  getClassTimes(classId: number): Observable<any[]> {
  

    return this.http.get<any[]>(`${this.staticData}/Classe/${classId}/times`);
  }
  // Join class with selected time and user ID
  joinClass(classId: number, timeId: number, userId: number): Observable<any> {

    return this.http.post(`${this.staticData}/Classe/${classId}/join`, { timeId, userId });
  }
}
