import { Component } from '@angular/core';
import { UrlService } from '../MohammadURL/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrl: './nutrition.component.css'
})
export class NutritionComponent {
  parameter: any;
  nutritionArray: any;


  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get("id");
    console.log("Parameter ID:", this.parameter);

    this.getNutrition(this.parameter);

  }

  constructor(private _ser: UrlService, private _rout: ActivatedRoute) {

  }

  getNutrition(id: any) {
    this._ser.getSubMealNutrition(id).subscribe((data: any) => {
      this.nutritionArray = data;
      console.log("Nutrition Array:", this.nutritionArray);
    })
  }

}
