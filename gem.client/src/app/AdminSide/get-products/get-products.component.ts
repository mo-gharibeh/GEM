import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';

@Component({
  selector: 'app-get-products',
  templateUrl: './get-products.component.html',
  styleUrl: './get-products.component.css'
})
export class GetProductsComponent {
  ngOnInit() {

    this.getProductsAdmin();//start ponit of lifecycle of angular when we make a refresh or reload will go to ngonit
  }
  constructor(private _ser: DimaUrlServiceService) {


  }

  Array: any
  getProductsAdmin() {
    this._ser.getProduct().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.productArray")
    })

  }





  deleteProducts(productId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this._ser.deleteProduct(productId).subscribe(
        response => {
          console.log('Category deleted:', response);

          this.Array = this.Array.filter((item: any) => item.productId !== productId);
        },
        error => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }
}
