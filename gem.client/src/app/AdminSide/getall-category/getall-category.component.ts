import { Component } from '@angular/core';
import { DimaUrlServiceService } from '../../newProject8/dima/dimaUrl/dima-url-service.service';

@Component({
  selector: 'app-getall-category',
  templateUrl: './getall-category.component.html',
  styleUrl: './getall-category.component.css'
})
export class GetallCategoryComponent {
  ngOnInit() {

    this.GetCategoryAdmin();
  }
  constructor(private _ser: DimaUrlServiceService) {


  }

  Array: any
  GetCategoryAdmin() {
    this._ser.getCategory().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.categoryArray")
    })

  }


  deleteCategory(categoryId: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this._ser.deleteCategory(categoryId).subscribe(
        response => {
          console.log('Category deleted:', response);

          this.Array = this.Array.filter((item: any) => item.categoryId !== categoryId);
        },
        error => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }
}
