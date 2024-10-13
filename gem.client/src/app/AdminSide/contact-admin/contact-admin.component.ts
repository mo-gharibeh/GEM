import { Component } from '@angular/core';
import { UrlService } from '../../newProject8/Mohammad/MohammadURL/url.service';
import { UrlAdminService } from '../yousefUrlAdmin/url-admin.service';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrl: './contact-admin.component.css'
})
export class ContactAdminComponent {


  ngOnInit() {
    this.getComents();
  }

  constructor(private _ser2: UrlAdminService) {

  }

  ComentsArray: any
  getComents() {
    this._ser2.getComents().subscribe((data) => {
      this.ComentsArray = data;
      console.log("Services", this.ComentsArray)
    })
  }

}
