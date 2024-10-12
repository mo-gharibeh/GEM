import { Component } from '@angular/core';
import { UrlServiceService } from '../HadeelURL/url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.css'
})
export class ClasseComponent {
  constructor(private _ser: UrlServiceService, private _rout: ActivatedRoute) { }


  ngOnInit() {
    this.getClasses();


  }

  ClassArray: any;

  getClasses() {
    debugger
    this._ser.getAllClasses().subscribe((data) => {
      debugger
      this.ClassArray = data;
      console.log(this.ClassArray);
    });
  }
}
