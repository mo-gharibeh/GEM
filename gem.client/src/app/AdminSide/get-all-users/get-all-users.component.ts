import { Component, OnInit } from '@angular/core';
import { AhmedUrlService } from '../../newProject8/Ahmed/AhmedUrl/Ahmed-url.service';

@Component({
  selector: 'app-get-all-users',
  templateUrl: './get-all-users.component.html',
  styleUrls: ['./get-all-users.component.css']
})
export class GetAllUsersComponent implements OnInit {
  Array: any[] = []; // Initialize as an empty array

  constructor(private _ser: AhmedUrlService) { }

  ngOnInit() {
    this.GetUsersAdmin();
  }

  GetUsersAdmin() {
    this._ser.getUsers().subscribe(
      (data) => {
        this.Array = data;
        console.log(this.Array, "this.UsersArray");
      },
      (error) => {
        console.error("Error fetching users:", error);
      }
    );
  }
}
