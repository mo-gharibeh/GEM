import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LujainURLService {
  staticData = "https://localhost:44340/api";
  //staticData = "https://localhost:7031/api";

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


  getCartItem(userId: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Cart/Cart/${userId}`);
  }



  addCartItem(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Cart/Cart`, data)
  }
  editCartItem(userId: any, cartItemId: any, quantity: number): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Cart/Cart/${userId}/${cartItemId}`, quantity);
  }
  deleteCartItem(userId: any, cartItemId: any): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Cart/Cart/${userId}/${cartItemId}`);
  }





  addCartItemToDatabase(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Cart/Cart/${data.userId}`, data)
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

      if (data.userId != 0) {
        this.addCartItemToDatabase(data).subscribe(
          (response) => {
            console.log("Item added to the database:", response);
          },
          (error) => {
            console.error("Failed to add item to the database:", error);
          }
        );
      }
    }
  }




  pushCartToDatabase(userId: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Cart/Cart/${userId}`, {
      userId,
      cartItems: this.cartItem
    });
  }

  syncLocalCartToDatabase(userId: number) {
    const storedCart = localStorage.getItem('cartItems');

    if (storedCart) {
      const cartItems = JSON.parse(storedCart);
      const syncPromises = cartItems.map((localItem: any) => {
        return this.getCartItem(userId).toPromise().then((dbItems) => {
          const existingDbItem = dbItems.find((dbItem: any) => dbItem.productId === localItem.productId);

          if (existingDbItem) {
            // If it exists, update the quantity
            const updatedQuantity = existingDbItem.quantity + localItem.quantity; // Combine quantities
            return this.editCartItem(userId, existingDbItem.cartItemId, updatedQuantity).toPromise().then(
              (response) => {
                console.log("Updated existing item in database:", response);
              },
              (error) => {
                console.error("Failed to update item in database:", error);
              }
            );
          } else {
            // If it doesn't exist, add a new item to the database
            localItem.userId = userId; // Ensure userId is set
            return this.addCartItemToDatabase(localItem).toPromise().then(
              (response) => {
                console.log("Added new item to database:", response);
              },
              (error) => {
                console.error("Failed to add item to database:", error);
              }
            );
          }
        });
      });

      // After syncing all items, remove local storage only if all items were successfully synced
      Promise.all(syncPromises).then(() => {
        localStorage.removeItem('cartItems');
      }).catch(() => {
        console.error("Error syncing cart items.");
      });
    }
  }








  //// Method to increase the quantity and update it in the database
  //increaseQuantity(userId: number, cartItemId: number) {
  //  const product = this.cartItem.find((x: any) => x.productId == cartItemId);
  //  if (product) {
  //    product.quantity += 1;
  //    this.cartITemSubject.next(this.cartItem);
  //    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));

  //    // Call the API to update the database
  //    this.editCartItem(userId, cartItemId, product.quantity).subscribe(
  //      (response) => {
  //        console.log("Quantity increased successfully:", response);
  //      },
  //      (error) => {
  //        console.error("Failed to increase quantity:", error);
  //      }
  //    );
  //  }
  //}

  //// Method to decrease the quantity and update it in the database
  //decreaseQuantity(userId: number, cartItemId: number) {
  //  const product = this.cartItem.find((x: any) => x.productId == cartItemId);
  //  if (product && product.quantity > 1) {
  //    product.quantity -= 1;
  //    this.cartITemSubject.next(this.cartItem);
  //    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));

  //    // Call the API to update the database
  //    this.editCartItem(userId, cartItemId, product.quantity).subscribe(
  //      (response) => {
  //        console.log("Quantity decreased successfully:", response);
  //      },
  //      (error) => {
  //        console.error("Failed to decrease quantity:", error);
  //      }
  //    );
  //  } else if (product.quantity === 1) {
  //    alert("The quantity cannot be less than 1.");
  //  }
  //}

  // API call to update the quantity in the database


  removeItem(cartItemId: any) {
    this.cartItem = this.cartItem.filter((item: any) => item.cartItemId !== cartItemId);
    this.cartITemSubject.next(this.cartItem);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItem));
  }

}



