import { Component } from '@angular/core';
import { UrlService } from '../../newProject8/Mohammad/MohammadURL/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-meal',
  templateUrl: './add-meal.component.html',
  styleUrl: './add-meal.component.css'
})
export class AddMealComponent {

  ngOnInit() {
    //this.fetchCategories();

  }
  constructor(private _ser: UrlService, private _router: Router) {
  }
  //userRegisterArray: any

  //categories: any[] = [];
  //fetchCategories() {
  //  this._ser.getCategory().subscribe(
  //    (data: any[]) => {
  //      this.categories = data; // Assuming `data` is an array of categories
  //    },
  //    (error) => {
  //      alert('Error fetching categories');
  //    }
  //  );
  //}


  image: any

  //changeImage(event: any) {

  //  //this.image = event.target.files[0]
  //}





  //addnewProduct(data: any) {

  //  var form = new FormData();
  //  for (let key in data) {
  //    form.append(key, data[key])

  //  }
  //  form.append("Image", this.image)
  //  this._ser.AddProduct(form).subscribe(() => {
  //    alert(" the Product add sucessfully")
  //    this._router.navigate(['AdminDashBoard/GetProducts'])
  //    //this.userRegisterArray = data
  //  },

  //    (error) => { alert(error.error) }
  //  )
  //}
}
