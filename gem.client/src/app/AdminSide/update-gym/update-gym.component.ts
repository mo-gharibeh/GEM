import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- Import FormsModule
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-gym',
  templateUrl: './update-gym.component.html',
  styleUrls: ['./update-gym.component.css'] // Corrected from styleUrl to styleUrls
})
export class UpdateGymComponent {
  imageFile: any;
  editGymId: any = null; // Initialize the editGymId property
  ServiceId: any;
  GymArray: any;
  parameter: any
  array: any
  constructor(private _ser: UrlServiceService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.ServiceId = this._route.snapshot.paramMap.get("id");
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getDetails(this.parameter);
  }

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
  }


  DetailsArray: any

  getDetails(id: any) {
    debugger
    this._ser.getGymDetails(id).subscribe((data) => {
      debugger
      this.DetailsArray = data
      console.log(this.DetailsArray)
    })
  }


  updateGymAdmin(data: any) {

    debugger
    const formdata = new FormData();

    for (let item in data) {
      formdata.append(item, data[item]);
    }

    formdata.append("Image", this.imageFile);
    console.log(formdata)
    this._ser.UpdateGym(this.ServiceId, formdata).subscribe((data) => {
      debugger
      alert("Gym Updated Successfully !");
      this._router.navigate(["/AdminDashBoard/ShowGym"]);
    });
  }


  // Cancel edit operation
  cancelEdit() {
    this.editGymId = null; // Close edit card
  }
}
