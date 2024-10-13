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
  ngOnInit() {
    this._serm.emailAddress.subscribe(data => this.email = data)
  }


logout() {
  this._serm.email.next('');
  this._router.navigate(['/Login'])
}

}
