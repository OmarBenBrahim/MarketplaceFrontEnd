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
  
  constructor(public productService : ProductsService,private route: ActivatedRoute) { }
  myproducts : string = 'false';
 
  ngOnInit(): void {
    this.productService.productParams = undefined;
    this.route.queryParams
      .subscribe(params => {
        this.loadProducts(params);
      });
  }
  
  loadProducts(params :any){
      
      this.productService.productParams = params;
      this.productService.loadProducts()
  }
  loadPreviousPage(){
    this.productService.loadPreviousPage();
  }
  loadNextPage(){
    this.productService.loadNextPage();
  }

}
