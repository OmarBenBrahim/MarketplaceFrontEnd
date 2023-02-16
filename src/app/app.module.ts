import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './main/products/products.component';
import { ProductCardComponent } from './main/product-card/product-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterComponent } from './main/filter/filter.component';
import { LoginComponent } from './login/login.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './main/add-product/add-product.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    ProductsComponent,
    ProductCardComponent,
    FilterComponent,
    LoginComponent,
    CreateAccountComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
