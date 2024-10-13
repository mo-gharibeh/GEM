import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-and-gym',
  templateUrl: './class-and-gym.component.html',
  styleUrl: './class-and-gym.component.css'
})
export class ClassAndGymComponent {


  constructor(private _ser: UrlServiceService) { }

  ngOnInit() {
    this.getGyms();
  }

  GymArray: any;

  getGyms() {
    this._ser.getGym().subscribe((data) => {
      debugger
      this.GymArray = data;
      console.log(this.GymArray);
    });
  }

  remove(id: any) {
    this._ser.remove(id).subscribe((data) => {
     
    });
  }
}
