import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthGuard } from './guard/auth.guard';
import { NotauthGuard } from './guard/notauth.guard';
import { LoginComponent } from './login/login.component';
import { AddProductPhotosComponent } from './main/add-product-photos/add-product-photos.component';
import { AddProductComponent } from './main/add-product/add-product.component';
import { DetailProductComponent } from './main/detail-product/detail-product.component';
import { EditProductComponent } from './main/edit-product/edit-product.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path : 'products' , component : MainComponent, canActivate : [AuthGuard]},
  {path : 'add-product' , component : AddProductComponent, canActivate : [AuthGuard]},
  {path : 'add-product-photos' , component : AddProductPhotosComponent, canActivate : [AuthGuard]},
  {path : 'product-detail/:id' , component : DetailProductComponent, canActivate : [AuthGuard]},
  {path : 'edit-product/:id' , component : EditProductComponent, canActivate : [AuthGuard]},
  {path : "login" , component : LoginComponent, canActivate : [NotauthGuard] },
  {path : "signup" , component : CreateAccountComponent, canActivate : [NotauthGuard] },
  {path : '**' , redirectTo :'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
