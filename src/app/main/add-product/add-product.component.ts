import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { Product } from 'src/app/models/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  productForm = new FormGroup({
    categorie : new FormControl('', [Validators.required]),
    title : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    price : new FormControl('', [Validators.required]),
  });

  constructor(private productsService : ProductsService) { }

  ngOnInit(): void {
  }

  SaveProduct(){
    let product = this.productForm.value;
    this.productsService.AddProduct(product).pipe(take(1)).subscribe({
      next : response => {
        console.log(response);
      }
    })
  }

}
