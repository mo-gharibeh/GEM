import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlAdminService } from '../yousefUrlAdmin/url-admin.service';

@Component({
  selector: 'app-replycontact',
  templateUrl: './replycontact.component.html',
  styleUrl: './replycontact.component.css'
})
export class ReplycontactComponent {

  param : any
  ngOnInit() {
    this.param = this._router.snapshot.paramMap.get("id")
    console.log("iddddd", this.param)
    this.getComentsById()
}
  specificData: any
  subject: any
  email : any
  constructor(private _router: ActivatedRoute , private _ser : UrlAdminService) { }
  getComentsById() {

    this._ser.getComentsById(this.param).subscribe((data) => {
      this.specificData = data
      console.log(this.specificData, "aaaa")
      this.subject = this.specificData.subject
      this.email = this.specificData.email
      console.log("sss", this.subject)
    })
  }

}
