import { Component } from '@angular/core';
import { UrlServiceService } from '../../newProject8/Hadeel/HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-class',
  templateUrl: './update-class.component.html',
  styleUrl: './update-class.component.css'
})
export class UpdateClassComponent {
  imageFile: any;
  editGymId: any = null; // Initialize the editGymId property
  ServiceId: any;
  ClassDetails: any
  parameter: any
  array: any
  selectedTime: any = null; // To hold the selected class time
  userId: number | 0 = 0; // Store the user ID
  classTimes: any[] = []; // Store the class times

  constructor(private _ser: UrlServiceService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.ServiceId = this._route.snapshot.paramMap.get("id");
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getClassById(this.parameter)
  }

  changeImage(event: any) {
    this.imageFile = event.target.files[0];
  }


  getClassById(id: any) {
    debugger
    this._ser.getClassById(id).subscribe((data) => {
      debugger
      this.ClassDetails = data
      console.log(this.ClassDetails)
    })
  }
  // Fetch class times for the class
  getClassTimes(classId: number) {
    this._ser.getClassTimes(classId).subscribe(
      (data: any[]) => {
        this.classTimes = data;
      },
      (error) => {
        console.error('Error fetching class times', error);
      }
    );
  }

  updateClassAdmin(data: any) {

    debugger
    const formdata = new FormData();

    for (let item in data) {
      formdata.append(item, data[item]);
    }

    formdata.append("Image", this.imageFile);
    console.log(formdata)
    this._ser.UpdateClass(this.ServiceId, formdata).subscribe((data) => {
      debugger
      alert("Class Updated Successfully !");
      this._router.navigate(["/AdminDashBoard/ShowClass"]);
    });
  }


  // Cancel edit operation
  cancelEdit() {
    this.editGymId = null; // Close edit card
  }




  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
  }

}
