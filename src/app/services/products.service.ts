import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { map, of, take } from 'rxjs';
import { ProductParams } from '../models/productParams';


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
  ];


    
  constructor(private http: HttpClient) {}

  loadProducts(productParams : ProductParams){
    let params = new HttpParams();
    
    if(productParams.minPrice) params = params.append('minPrice' , productParams.minPrice);
    if(productParams.maxPrice) params = params.append("maxPrice" , productParams.maxPrice);
    if(productParams.categorie && productParams.categorie.length> 0 ) params = params.append("categorie" , productParams.categorie);
    if(productParams.state && productParams.state.length> 0) params =  params.append("state" , productParams.state);


    return this.http.get<Product[]>(this.baseUrl + "product" , {params : params})


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
