import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrl: './update-category.component.css'
})
export class UpdateCategoryComponent {
  param: any
  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')
    //start ponit of lifecycle of angular when we make a refresh or reload will go to ngonit
  }
  constructor(private _ser: DimaUrlServiceService, private _active: ActivatedRoute, private _router: Router) {


  }

  Array: any
  UpdateCategory(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }
   

    this._ser.updateCategory(this.param, form).subscribe(response => {
      alert("The category has been updated successfully");

      
      this._router.navigate(['AdminDashBoard/GetCategories']);
    }, error => {
     
      console.error("Error updating category", error);
    });
  }
  
}
