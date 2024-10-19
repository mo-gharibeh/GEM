import { Component } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gym-detail',
  templateUrl: './gym-detail.component.html',
  styleUrl: './gym-detail.component.css'
})
export class GymDetailComponent {

  parameter: any;
  array: any;
  totalAmount: any;

  DetailsArray: any;

  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get("id");
    this.getDetails(this.parameter);
  }

  constructor(private _ser: UrlServiceService, private _rout: ActivatedRoute, private router: Router) { }

  getDetails(id: any) {
    this._ser.getGymDetails(id).subscribe((data) => {
      this.DetailsArray = data;
      this.totalAmount = this.DetailsArray.price;
      console.log(this.DetailsArray);
    });
  }

  // Initialize the data object with default values
  data = {
    "userId": "",
    "classSubId": 1,
    "paymentMethod": "Paypal"
  };

  AddUserSubScribtion(id: number) {


    const userid = localStorage.getItem('userId');

    if (userid === null) {
      alert("Please Login First");
      this.router.navigate(['/Login']);

    } else {

      this.data.userId = userid;
      this.data.classSubId = id;

      this._ser.addUSerSubScription(this.data).subscribe(() => {
        localStorage.setItem('totalAmount', this.totalAmount.toString());

        this.router.navigate(['/payment']);
      });
    }
  }
}
