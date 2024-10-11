import { Component } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.css'
})
export class GymComponent {


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
}
