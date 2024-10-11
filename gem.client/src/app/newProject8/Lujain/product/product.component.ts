import { Component } from '@angular/core';
import { LujainURLService } from '../LujainURL/lujain-url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  ProductArray: any;
  count: any;
  paramter: any;
  productCategory: any;
  CategoryArry: any;



  constructor(private _ser: LujainURLService, private _router: ActivatedRoute) { }

  ngOnInit() {
    this.getProductFit();
    this.getProductCount();
    this.getCategories();






    this.paramter = this._router.snapshot.paramMap.get("id");
  }

  getProductFit() {
    this._ser.getProduct().subscribe((data) => {
      this.ProductArray = data;
      console.log("Fetched services data:", this.ProductArray);
    });

  }

  getCategories() {
    this._ser.getCategory().subscribe((data) => {
      this.CategoryArry = data;
      console.log("Fetched services data:", this.CategoryArry);
    });

  }



  getProductCount() {
    this._ser.getCount().subscribe((data) => {
      this.count = data;
      console.log("Fetched services data:", this.count);
    });
  }
  getProductCategory(id: any) {

    if (id === null) {
      // Fetch all products when "All Products" is clicked
      this.getProductFit(); // Fetch all products
    } else {
      // Fetch products for the selected category
      this._ser.getProductByCategory(id).subscribe((data: any) => {
        this.ProductArray = data; // Update the products array with filtered products
        console.log("Fetched Products data:", this.ProductArray);
      });
    }
  }

  
  
  object = {
    cartItem: 0,
    productId: 0,
    userId: 0,
    quantity: 0,
    //productName: "",
    //price: 0,
    //image:""




  }
  

  addtoCart(productId: any) {
    debugger;
    this.object.productId = productId;


    this._ser.addTocart({ ... this.object });
    alert("item added sucess")

  }

}
