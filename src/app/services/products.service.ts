import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { map, of, take } from 'rxjs';
import { ProductParams } from '../models/productParams';
import { Pagination } from '../models/pagination';
import { Photo } from '../models/photo';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;

  products : Product[] = [];
  paginatition : Pagination | undefined;
  productId : Number | undefined ;
  product : Product | any;
  productParams : any;
  pageNumber = 1;
  pageSize = 8 ;

  categories = [
    "Image Son",
    "Ordinateurs portables",
    "Appareils photo et Caméras",
    "Télévisions",
    "Téléphones",
    "Accessoires informatiques et Gadgets",
    "Jeux vidéo et Consoles",
    "Tablettes",
  ];


    
  constructor(private http: HttpClient) {}

  loadProducts(){
    let params = new HttpParams();
    
    for( var key in this.productParams ) {
      params = params.append(key ,  this.productParams[key] );
    }
    params = params.append("pageNumber", this.pageNumber);
    params = params.append("pageSize", this.pageSize);
    console.log(params);

    this.http.get<Product[]>(this.baseUrl + "product" , {observe : 'response' , params}).pipe(take(1)).subscribe({
      next : response => {
        if(response.body){
          this.products = response.body;
          console.log(this.products)
        } 
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          this.paginatition = JSON.parse(pagination)
          console.log(this.paginatition);
        }
      }
    })
    
  }

  loadMyProducts(){
    return this.http.get<Product[]>(this.baseUrl + "product/myproducts")
  }

  loadProduct(id : Number){
    if(this.product && this.product.id == id) return of(this.product); 
    return this.http.get<Product>(this.baseUrl + "product/"+id);
  }

  AddProduct(){
    return this.http.post<Number>(this.baseUrl + "product/", this.product)
  }

  EditeProduct(id : Number){
    return this.http.put<Number>(this.baseUrl + "product/"+id, this.product)
  }

  deletePhoto(photo : Photo){
    
    return this.http.delete(this.baseUrl+ 'product/delete-photo/'+ photo.id).pipe(take(1)).subscribe({
      next : () =>{
        this.product = this.localDeletePhotoById(this.product , photo.id);
      }
    })
  }

  loadNextPage(){
    this.pageNumber++;
    this.loadProducts()
  }

  loadPreviousPage(){
    this.pageNumber--;
    this.loadProducts()
  }


  localDeletePhotoById(product : Product, id : number) {
    const objWithIdIndex = product.photos.findIndex((photo) => photo.id === id);
  
    if (objWithIdIndex > -1) {
      product.photos.splice(objWithIdIndex, 1);
    }
  
    return product;
  }
}
