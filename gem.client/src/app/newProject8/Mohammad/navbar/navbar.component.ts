import { Component } from '@angular/core';
import { MurlService } from '../../../murl.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private _serm: MurlService, private _router: Router) { }  // Added import statement for SharedService

  email: any;
  userId: any ; 
  ngOnInit() {
    this._serm.emailAddress.subscribe(data => this.email = data)
    this.userId = localStorage.getItem("userId");
  }


logout() {
  this._serm.email.next('');
  localStorage.clear();
  this._router.navigate(['/Login'])
}

}
