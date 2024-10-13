import { Component } from '@angular/core';
import { UrlService } from '../../newProject8/Mohammad/MohammadURL/url.service';
import { UrlAdminService } from '../yousefUrlAdmin/url-admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Snapshot } from 'jest-editor-support';

@Component({
  selector: 'app-contact-admin',
  templateUrl: './contact-admin.component.html',
  styleUrl: './contact-admin.component.css'
})
export class ContactAdminComponent {


param : any
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
