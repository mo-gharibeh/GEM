import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {

  ngOnInit() {
    this.fetchCategories();

  }
  constructor(private _ser: DimaUrlServiceService, private _router: Router) {
  }
  //userRegisterArray: any

  categories: any[] = []; 
  fetchCategories() {
    this._ser.getCategory().subscribe(
      (data: any[]) => {
        this.categories = data; // Assuming `data` is an array of categories
      },
      (error) => {
        alert('Error fetching categories');
      }
    );
  }


  image: any

  changeImage(event: any) {

    this.image = event.target.files[0]
  }





  addnewProduct(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }
    form.append("Image", this.image)
    this._ser.AddProduct(form).subscribe(() => {
      alert(" the Product add sucessfully")
      this._router.navigate(['AdminDashBoard/GetProducts'])
      //this.userRegisterArray = data
    },

      (error) => { alert(error.error) }
    )
  }
}
