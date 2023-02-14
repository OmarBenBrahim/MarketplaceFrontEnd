import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  constructor(public productService : ProductsService) { }

  ngOnInit(): void {
    this.productService.loadProducts().pipe(take(1)).subscribe({
      next : products => this.products = products 
    })
    
  }

}
