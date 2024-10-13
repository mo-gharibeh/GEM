import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  ngOnInit() { }
  constructor(private _ser: DimaUrlServiceService, private _router: Router) {
  }
  
 

  addCategory(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }
  
    this._ser.AddCategory(form).subscribe(() => {
      alert("The category has been added successfully");


      this._router.navigate(['AdminDashBoard/GetCategories']);
    }, error => {

      console.error("Error updating category", error);
    });
  }
}
