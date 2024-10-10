import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './newProject8/Mohammad/home/home.component';
import { NavbarComponent } from './newProject8/Mohammad/navbar/navbar.component';
import { TipsComponent } from './newProject8/Lujain/tips/TipsComponent';
import { MealsComponent } from './newProject8/Lujain/meals/meals.component';
import { SubMealComponent } from './newProject8/Lujain/sub-meal/sub-meal.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './newProject8/yousef/about/about.component';
import { ContactComponent } from './newProject8/yousef/contact/contact.component';

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
    SubMealComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        path: '', component: HomeComponent, pathMatch: 'full'
      },
      {
        path: 'Tips', component: TipsComponent
      },
      {
        path: 'Meals', component: MealsComponent
      }


    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
