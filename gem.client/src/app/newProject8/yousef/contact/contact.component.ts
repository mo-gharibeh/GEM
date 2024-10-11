import { Component } from '@angular/core';
import { UrlService } from '../yousefurl/url.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {


  ngOnInit() {

  }

  constructor(private _ser: UrlService, private _router: Router) {

  }

  addNewComent(data: any) {
    debugger
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    this._ser.postContactForm(form).subscribe(() => {
      alert("Coment Sent successfully")
      /*this._router.navigate(['']);*/
    },
      (error) => {
        alert(error.error)
      }
    )
  }


}

