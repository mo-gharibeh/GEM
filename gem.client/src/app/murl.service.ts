import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MurlService {

  email: BehaviorSubject<string> = new BehaviorSubject<string>("");

  emailAddress = this.email.asObservable();
  constructor() { }
}
