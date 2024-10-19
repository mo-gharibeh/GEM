import { Component } from '@angular/core';
import { AhmedUrlService } from '../AhmedUrl/Ahmed-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  ngOnInit() {

  }

  constructor(private _ser: AhmedUrlService, private _router: Router) {

  }

  addNewUser(data: any) {
    debugger
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    this._ser.addUserRegistration(form).subscribe(() => {
      alert("user added successfully")
      this._router.navigate(['/Login']);
    },
      (error) => {
        alert(error.error)
      }
    )
  }
}
