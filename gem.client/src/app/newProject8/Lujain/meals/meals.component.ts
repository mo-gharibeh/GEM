import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrl: './meals.component.css'
})
export class MealsComponent {
  MealArray: any;

  constructor(private _ser: LujainURLService) { }

  ngOnInit() {
    this.getMealsRe();
  }

  getMealsRe() {
    this._ser.getMeal().subscribe((data) => {
      this.MealArray = data;
      console.log("Fetched services data:", this.MealArray);
    });
  }
}
