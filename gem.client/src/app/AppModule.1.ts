import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ProfileComponent } from "./newProject8/Bassam/profile/profile.component";
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule

import { GymComponent } from "./newProject8/Hadeel/gym/gym.component";
import { BmiCalculatorComponent } from "./newProject8/Lujain/bmi-calculator/bmi-calculator.component";
import { MealsComponent } from "./newProject8/Lujain/meals/meals.component";
import { ProductComponent } from "./newProject8/Lujain/product/product.component";
import { SubMealComponent } from "./newProject8/Lujain/sub-meal/sub-meal.component";
import { TipsComponent } from "./newProject8/Lujain/tips/TipsComponent";
import { FooterComponent } from "./newProject8/Mohammad/footer/footer.component";
import { HomeComponent } from "./newProject8/Mohammad/home/home.component";
import { NavbarComponent } from "./newProject8/Mohammad/navbar/navbar.component";
import { AboutComponent } from "./newProject8/yousef/about/about.component";
import { ContactComponent } from "./newProject8/yousef/contact/contact.component";
import { CartComponent } from "./newProject8/Lujain/cart/cart.component";
import { LoginComponent } from "./newProject8/Ahmed/login/login.component";
import { GymDetailComponent } from "./newProject8/Hadeel/gym-detail/gym-detail.component";
import { RegisterComponent } from "./newProject8/Ahmed/register/register.component";
import { ClasseComponent } from "./newProject8/Hadeel/classe/classe.component";
import { EditProfileComponent } from "./newProject8/Bassam/edit-profile/edit-profile.component";
import { PaypalComponent } from "./newProject8/Lujain/paypal/paypal.component";
import { ClassDetailsComponent } from "./newProject8/Hadeel/class-details/class-details.component";
import { AdminDashboardComponent } from "./AdminSide/admin-dashboard/admin-dashboard.component";
import { ClassAndGymComponent } from "./AdminSide/class-and-gym/class-and-gym.component";
import { NutritionComponent } from "./newProject8/Mohammad/nutrition/nutrition.component";
import { GetallCategoryComponent } from "./AdminSide/getall-category/getall-category.component";
import { UpdateCategoryComponent } from "./AdminSide/update-category/update-category.component";
import { AddCategoryComponent } from "./AdminSide/add-category/add-category.component";
import { GetProductsComponent } from "./AdminSide/get-products/get-products.component";
import { AddProductsComponent } from "./AdminSide/add-products/add-products.component";
import { UpdateProductsComponent } from "./AdminSide/update-products/update-products.component";
import { AddGymComponent } from "./AdminSide/add-gym/add-gym.component";
import { UpdateGymComponent } from "./AdminSide/update-gym/update-gym.component";




@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    ContactComponent,
    NavbarComponent,
    TipsComponent,
    MealsComponent,
    SubMealComponent,
    FooterComponent,
    ProductComponent,
    ProfileComponent,
    GymComponent,
    GymDetailComponent,
    ClasseComponent,
    CartComponent,
    BmiCalculatorComponent,
    LoginComponent,
    ClassDetailsComponent,
    LoginComponent,
    RegisterComponent,
    PaypalComponent,
    AdminDashboardComponent,
    ClassAndGymComponent,
    AdminDashboardComponent,
    PaypalComponent,
    AddGymComponent,
    UpdateGymComponent,
    AdminDashboardComponent,
    
    AdminDashboardComponent,
    RegisterComponent,
    AdminDashboardComponent,
    GetallCategoryComponent,
    UpdateCategoryComponent,
    AddCategoryComponent,
    GetProductsComponent,
    UpdateProductsComponent,
    AddProductsComponent,
    PaypalComponent,
    NutritionComponent
  ],

  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
    RouterModule.forRoot([

      { path: '', component: HomeComponent, pathMatch: 'full' },

      { path: 'Tips', component: TipsComponent },

      { path: 'Meals', component: MealsComponent },

      { path: 'SubMeals/:id', component: SubMealComponent },

      { path: 'Gyms', component: GymComponent },

      { path: 'GymDetails/:id', component: GymDetailComponent },
      { path: 'classDetails/:id', component: ClassDetailsComponent },


      { path: 'Class', component: ClasseComponent },

      { path: 'ClassDetails/:id', component: ClassDetailsComponent },

      {
        path: 'AdminDashBoard', component: AdminDashboardComponent, children: [
          { path: "addGym", component: ClassAndGymComponent }
      ] },

      { path: 'Products', component: ProductComponent },

      { path: 'Profile', component: ProfileComponent },
      { path: 'edit-profile/:id', component: EditProfileComponent },

      { path: 'Cart', component: CartComponent },

      { path: 'bmi', component: BmiCalculatorComponent },

      { path: 'Login', component: LoginComponent },

      { path: 'About', component: AboutComponent },

      { path: 'Contact', component: ContactComponent },

      { path: 'nutrition/:id', component: NutritionComponent },

      { path: 'bmi', component: BmiCalculatorComponent },

      { path: 'Login', component: LoginComponent },

      { path: 'Register', component: RegisterComponent },
      { path: 'paypal', component: PaypalComponent },
    ])
        
    ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
