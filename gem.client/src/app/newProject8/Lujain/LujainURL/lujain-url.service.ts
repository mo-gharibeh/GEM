import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LujainURLService {

  staticData = "https://localhost:44340/api";

  constructor(private http: HttpClient) { }


  getTips(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/Tips`);
  }
  getMeal(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/Meal`);

  }

  getSubMeal(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Nutration/SubMeal/${id}`);
  }

  getProduct(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/GetProducts`);
  }

  getCount(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/Count`);
  }

  getProductByCategory(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Products/ProductsbyCategoryId/${id}`);
  }

  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/CategoryController1/Category`);
  }



  cartItem: any = [];
  cartITemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.cartItem);
  cartItemObser = this.cartITemSubject.asObservable();
  addTocart(data: any) {

    debugger;

    var record = this.cartItem.find((x: any) => x.productId == data.productId)
    if (record) {
      alert("the product already exist");
    }
    else {
      this.cartItem.push(data);
      this.cartITemSubject.next(this.cartItem);
    }

  }



  increaseQuantity(id: any) {

    var product = this.cartItem.find((x: any) => x.productId == id)


    if (product) {
      product.quantity += 1;
      this.cartITemSubject.next(this.cartItem);
    }
  }



  decreaseQuantity(id: any) {

    var product = this.cartItem.find((x: any) => x.productId == id)


    if (product) {
      product.quantity -= 1;
      this.cartITemSubject.next(this.cartItem);
    }
  }

  removeItem(id: any) {
    // Remove item from the local cart
    this.cartItem = this.cartItem.filter((item: any) => item.productId !== id);
    this.cartITemSubject.next(this.cartItem); // Notify observers
  }
}


