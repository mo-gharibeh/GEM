import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-gym',
  templateUrl: './add-gym.component.html',
  styleUrl: './add-gym.component.css'
})
export class AddGymComponent {

  imageFile: any
  changeImage(event: any) {
    debugger
    this.imageFile = event.target.files[0]

  }

  constructor(private _ser: UrlServiceService, private _router: Router) { }

  AddNewService(data: any) {
    debugger
    var formdata = new FormData();


    for (let item in data) {
      formdata.append(item, data[item])
    }

    formdata.append("Image", this.imageFile)
    console.log(formdata)

    this._ser.AddService(formdata).subscribe(() => {
      alert("Gym add successfully!")
      this._router.navigate(['/AdminDashBoard/ShowGym']);
    }, (error) => {
      alert(error.error)
    })
  }

}
