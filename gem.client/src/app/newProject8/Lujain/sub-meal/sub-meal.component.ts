import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-meal',
  templateUrl: './sub-meal.component.html',
  styleUrl: './sub-meal.component.css'
})
export class SubMealComponent {
  paramter: any;
  subMeal: any;

  constructor(private _ser: LujainURLService, private _router: ActivatedRoute) { }

  ngOnInit() {
    this.paramter = this._router.snapshot.paramMap.get("id");
    console.log("Parameter ID:", this.paramter);

    this.getSubMeal(this.paramter);

  }

  getSubMeal(id: any) {
    this._ser.getSubMeal(id).subscribe((data: any) => {
      this.subMeal = data;
      console.log("Fetched sub services data:", this.subMeal);
    },
    );
  }

}
