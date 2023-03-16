import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
import { AddProductPhotosComponent } from './main/add-product-photos/add-product-photos.component';
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
import { DetailProductComponent } from './main/detail-product/detail-product.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { telephoneFill, geoAltFill } from 'ngx-bootstrap-icons';
import { EditProductComponent } from './main/edit-product/edit-product.component';
import { ToastrModule } from 'ngx-toastr';
import { ErrorInterceptorInterceptor } from './interceptors/error-interceptor.interceptor';

const icons = {
  telephoneFill,
  geoAltFill
};




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
    AddProductComponent,
    AddProductPhotosComponent,
    DetailProductComponent,
    EditProductComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    NgxGalleryModule,
    NgxBootstrapIconsModule.pick(icons),
    ToastrModule.forRoot(),

    
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : JwtInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
