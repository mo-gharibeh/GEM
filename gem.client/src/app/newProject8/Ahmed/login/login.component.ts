import { Component } from '@angular/core';
import { AhmedUrlService } from '../AhmedUrl/Ahmed-url.service';
import { Router } from '@angular/router';
import { MurlService } from '../../../murl.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: any;
  ngOnInit() {
    this._serm['email'];
  }

  constructor(private _ser: AhmedUrlService, private _serm: MurlService, private _router: Router) {

  }


  loginNewUser(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.loginUser(form).subscribe((response) => {

      this._serm['email'].next(data.email);
      
      if (data.email == "admin@gmail.com") {
        this._router.navigate(['/AdminDashBoard']);
      } else {
        this._router.navigate(['']);
      }
      //const userId = response.userId;
      //localStorage.setItem('userId', userId);
        alert("User logged in successfully");
      },
        (error) => {
          alert(error.error);
        });
    //  this._ser['email'].next(response.email);
    //  if (response.email == 'admin@gmail.com') {

    //    this._router.navigate(['Dashboard'])
    //  }
    //  else {
    //    this._router.navigate(['Services'])
    //  }
    //},

    //  (error) => { alert(error.error) }
    //)
  }

}
