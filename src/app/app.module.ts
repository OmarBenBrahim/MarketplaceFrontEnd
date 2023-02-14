import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MainComponent } from './main/main.component';
import { ProductsComponent } from './main/products/products.component';
import { ProductCardComponent } from './main/product-card/product-card.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterComponent } from './main/filter/filter.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    MainComponent,
    ProductsComponent,
    ProductCardComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
