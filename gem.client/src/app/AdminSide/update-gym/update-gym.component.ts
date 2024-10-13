import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-gym',
  templateUrl: './update-gym.component.html',
  styleUrl: './update-gym.component.css'
})
export class UpdateGymComponent {

  imageFile: any
  changeImage(event: any) {

    this.imageFile = event.target.files[0]

  }

  ServiceId: any;
  ngOnInit() {
    this.ServiceId = this._route.snapshot.paramMap.get("id");
  }

  constructor(private servicesURLService: UrlServiceService, private _route: ActivatedRoute, private _router: Router) { }



  updateServiceAdmin(data: any) {
    var formdata = new FormData();


    for (let item in data) {
      formdata.append(item, data[item])
    }

    formdata.append("ServiceImage", this.imageFile)

    this.servicesURLService.UpdateService(this.ServiceId, formdata).subscribe((data) => {
      alert("Service Updated Successfully !")
      this._router.navigate(["/dashboard"])
    });
  }
}
