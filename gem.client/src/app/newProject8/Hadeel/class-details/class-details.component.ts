import { Component } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrl: './class-details.component.css'
})
export class ClassDetailsComponent {
  parameter: any
  array: any
  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get("id");
    this.getClassById(this.parameter)
  }
  constructor(private _ser: UrlServiceService, private _rout: ActivatedRoute) { }

  Class: any

  getClassById(id: any) {
    this._ser.getClassById(id).subscribe((data) => {
      debugger
      this.Class = data
      console.log(this.Class)
    })
  }
}
