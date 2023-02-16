import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './create-account/create-account.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { AddProductComponent } from './main/add-product/add-product.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path : 'products' , component : MainComponent, canActivate : [AuthGuard]},
  {path : 'add-product' , component : AddProductComponent, canActivate : [AuthGuard]},
  {path : "login" , component : LoginComponent },
  {path : "signup" , component : CreateAccountComponent },
  {path : '**' , redirectTo :'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
