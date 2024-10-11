import { Component } from "@angular/core";
import { LujainURLService } from "../LujainURL/lujain-url.service";


@Component({
    selector: 'app-tips',
    templateUrl: './tips.component.html',
    styleUrl: './tips.component.css'
})
export class TipsComponent {

    TipsArray: any;

  constructor(private _ser: LujainURLService) { }

    ngOnInit() {
      this.getTipsNu();
    }

    getTipsNu() {
      this._ser.getTips().subscribe((data) => {
        this.TipsArray = data;
        console.log("Fetched services data:", this.TipsArray);
        });
    }
}
