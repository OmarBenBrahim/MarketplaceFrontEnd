import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/products';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
    
  constructor(private http: HttpClient) {}

  loadProducts(){
    return this.http.get<Product[]>(this.baseUrl + "product/")
  }
}
