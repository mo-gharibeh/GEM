import { Component } from '@angular/core';
import { UrlService } from '../AhmedUrl/Ahmed-url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  ngOnInit() {

  }

  constructor(private _ser: UrlService, private _router: Router) {

  }


  loginNewUser(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.loginUser(form).subscribe((response) => {
      const userId = response.userId; 
      localStorage.setItem('userId', userId);
      alert("User logged in successfully");
      this._router.navigate(['']);
    },
      (error) => {
        alert(error.error);
      });
  }

}
