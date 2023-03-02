import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  constructor(public productService : ProductsService,private route: ActivatedRoute) { }
  myproducts : string = 'false';
 
  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        let productParams = {
          minPrice : null,
          maxPrice : null,
          categorie : null,
          state : null,
        }

        if(params['myproducts']) this.myproducts = params['myproducts'];
        if(params['minPrice']) productParams.minPrice = params['minPrice'];
        if(params['maxPrice']) productParams.maxPrice = params['maxPrice'];
        if(params['categorie']) productParams.categorie = params['categorie'];
        if(params['state']) productParams.state = params['state'];
        this.loadProducts(productParams);
      });
  }
  

  loadProducts(productParams :any){
    if(this.myproducts == 'true'){
      this.productService.loadMyProducts().pipe(take(1)).subscribe({
        next : products => {
          this.products = products;

        }
      })
    }
    else{
      this.productService.loadProducts(productParams).pipe(take(1)).subscribe({
        next : products => {
          this.products = products;
        }
      })
    }
    
  }

}
