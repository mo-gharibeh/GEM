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


  getCartItem(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Cart/Cart/${id}`);
  }


  addCartItem(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Cart/Cart`, data)
  }

  editCartItem(userId: any, cartItemId: any, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Cart/Cart/${userId}/${cartItemId}`, { quantity });
  }

  deleteCartItem(userId: any, cartItemId: any): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Cart/Cart/${userId}/${cartItemId}`);
  }

  cartItem: any = [];
  cartITemSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.cartItem);
  cartItemObser = this.cartITemSubject.asObservable();
  addTocart(data: any) {
    var record = this.cartItem.find((x: any) => x.productId == data.productId);
    if (record) {
      alert("The product already exists");
    } else {
      this.cartItem.push(data);
      this.cartITemSubject.next(this.cartItem);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
    }
  }



  pushCartToDatabase(userId: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Cart/Cart`, {
      userId,
      cartItems: this.cartItem
    });
  }




  increaseQuantity(id: any) {
    const product = this.cartItem.find((x: any) => x.productId == id);
    if (product) {
      product.quantity += 1;
      this.cartITemSubject.next(this.cartItem);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
    }
  }

  decreaseQuantity(id: any) {
    const product = this.cartItem.find((x: any) => x.productId == id);
    if (product) {
      if (product.quantity > 1) {
        product.quantity -= 1;
        this.cartITemSubject.next(this.cartItem);
        localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
      } else {
        alert("The quantity cannot be less than 1.");
      }
    }
  }

  removeItem(id: any) {
    this.cartItem = this.cartItem.filter((item: any) => item.productId !== id);
    this.cartITemSubject.next(this.cartItem);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
  }
}



