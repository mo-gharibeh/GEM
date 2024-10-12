import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-and-gym',
  templateUrl: './class-and-gym.component.html',
  styleUrl: './class-and-gym.component.css'
})
export class ClassAndGymComponent {
  imageFile: any
  changeImage(event: any) {

    this.imageFile = event.target.files[0]

  }

  constructor(private _ser: UrlServiceService, private _router: Router) { }

  AddNewService(data: any) {
    var formdata = new FormData();


    for (let item in data) {
      formdata.append(item, data[item])
    }

    formdata.append("ServiceImage", this.imageFile)
    console.log(formdata)

    this._ser.AddService(formdata).subscribe(() => {
      alert("Service add successfully!")
      this._router.navigate(['/services']);
    }, (error) => {
      alert(error.error)
    })
  }
}
