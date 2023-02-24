import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { of, take } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  productId : Number | undefined ;
  product : Product | any;
  categories = [
    "Image Son",
    "Ordinateurs portables",
    "Appareils photo et Caméras",
    "Télévisions",
    "Téléphones",
    "Accessoires informatiques et Gadgets",
    "Jeux vidéo et Consoles",
    "Tablettes",
    "Other",
  ]

    
  constructor(private http: HttpClient) {}

  loadProducts(){
    return this.http.get<Product[]>(this.baseUrl + "product/")
  }

  loadMyProducts(){
    return this.http.get<Product[]>(this.baseUrl + "product/myproducts")
  }

  loadProduct(id : Number){
    if(this.product && this.product.id == id) return of(this.product); 
    return this.http.get<Product>(this.baseUrl + "product/"+id)
  }

  AddProduct(){
    return this.http.post<Number>(this.baseUrl + "product/", this.product)
  }

  EditeProduct(id : Number){
    return this.http.put<Number>(this.baseUrl + "product/"+id, this.product)
  }
}
