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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    TipsComponent,
    MealsComponent,
    SubMealComponent
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
