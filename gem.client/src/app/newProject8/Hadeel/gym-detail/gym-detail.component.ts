import { Component } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gym-detail',
  templateUrl: './gym-detail.component.html',
  styleUrl: './gym-detail.component.css'
})
export class GymDetailComponent {

  parameter: any
  array: any

  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get("id");
    this.getDetails(this.parameter)
  }

  constructor(private _ser: UrlServiceService, private _rout: ActivatedRoute) { }

  DetailsArray: any

  getDetails(id: any) {
    this._ser.getGymDetails(id).subscribe((data) => {
      debugger
      this.DetailsArray = data
      console.log(this.DetailsArray)
    })
  }


  data = {
    "userId": 0,
    "classSubId": 0,
    "paymentMethod": "string"
  }


  AddUserSubScribtion(id: number) {

    // هون لازم اشيك اذا اليوزر داخل و لا لا لحتى اذا كان داخل اسمحله يعمل سبسكرايب اذا لا بعطي الليرت 
    this.data.classSubId = id
    this._ser.addUSerSubScription(this.data).subscribe(() => {
      alert("Accept Successfully")
    })
  }
}
