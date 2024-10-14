import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-gym',
  templateUrl: './show-gym.component.html',
  styleUrl: './show-gym.component.css'
})
export class ShowGymComponent {

  constructor(private _ser: UrlServiceService, private _router: Router) { }

  ngOnInit() {
    this.getGyms();
  }

  GymArray: any;

  getGyms() {
    debugger
    this._ser.getGym().subscribe((data) => {
      debugger
      this.GymArray = data;
      console.log(this.GymArray);
    });
  }

  remove(id: any) {
    this._ser.remove(id).subscribe((data) => {
      alert("Gym Removes successfully!")
      this._router.navigate(['/AdminDashBoard/ShowGym']);
    });
  }
}
