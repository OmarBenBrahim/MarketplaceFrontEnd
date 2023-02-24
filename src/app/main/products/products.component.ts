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
        this.myproducts = params['myproducts']
        this.loadProducts();
      });
  }

  loadProducts(){
    
    if(this.myproducts == 'true'){
      this.productService.loadMyProducts().pipe(take(1)).subscribe({
        next : products => {
          this.products = products;
        }
      })
    }
    else{
      this.productService.loadProducts().pipe(take(1)).subscribe({
        next : products => {
          this.products = products;
        }
      })
    }
    
  }

}
