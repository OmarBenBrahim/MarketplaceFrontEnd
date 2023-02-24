import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { AccountService } from 'src/app/services/account.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  private routeSub: Subscription | undefined;
  ProductId : Number | undefined;

  productForm = new FormGroup({
    categorie : new FormControl('', [Validators.required]),
    title : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    price : new FormControl('', [Validators.required]),
  });

  constructor(private route: ActivatedRoute, public productService: ProductsService,
    private router: Router, public accountService: AccountService) {
  }

  ngOnInit(): void {
    
    this.routeSub = this.route.params.pipe(take(1)).subscribe(params => {
      this.ProductId = params['id'];
    });

    if(!this.productService.product){
      this.loadProduct()
    }
    else{
      this.remplirForm();
    }
    
  }

  loadProduct() {
    if (this.ProductId) {
      this.productService.loadProduct(this.ProductId).pipe(take(1)).subscribe({
        next: response => {
          this.productService.product = response;
          this.remplirForm();
        }
      })
    } else {
      this.router.navigate(['/products']);
    }
   
  }

  editProduct(){
    this.productService.product = this.productForm.value;
    console.log(this.productForm.value);
    if(!this.ProductId) return;
    this.productService.EditeProduct(this.ProductId).pipe(take(1)).subscribe({
      next : response => {
        this.productService.product = response;
        this.router.navigate(["product-detail/"+this.ProductId] )
      }
    })
  }

  remplirForm(){
    if(this.productService.product){
      console.log(this.productService.product)
      //this.productForm.controls['categorie'].patchValue(this.productService.product.categorieName.toLowerCase() , {onlySelf: true})
      this.productForm.setValue({
        categorie : this.productService.product.categorieName.toLowerCase(),
        title : this.productService.product.title,
        description: this.productService.product.description,
        price: this.productService.product.price.toString(),
      });
    }
  }

}
