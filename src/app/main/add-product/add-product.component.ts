import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';

import { Product } from 'src/app/models/product';
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

  constructor(private productsService : ProductsService,private router :Router) { }
  filesToUpload : FileList | undefined;
  formData = new FormData();

  ngOnInit(): void {
  }

  SaveProduct(){
    this.productsService.product = this.productForm.value;
    this.productsService.AddProduct().pipe(take(1)).subscribe({
      next : response => {
        this.productsService.product.id = response;
        this.router.navigate(["add-product-photos"], {queryParams: { id : response } })
      }
    })
  }
}
