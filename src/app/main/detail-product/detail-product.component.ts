import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { AccountService } from 'src/app/services/account.service';
import { UserToken } from 'src/app/models/userToken';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})
export class DetailProductComponent implements OnInit {

  routeSub: Subscription | undefined;
  ProductId: Number | undefined;
  product: Product | undefined;
  user: UserToken | undefined;
  galleryOptions: NgxGalleryOptions[] = [];
  galleryImages: NgxGalleryImage[] = [];
  constructor(private route: ActivatedRoute, private productService: ProductsService,
    private router: Router, public accountService: AccountService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.ProductId = params['id'];

      this.galleryOptions = [
        {
          width: '350px',
          height: '500px',
          imagePercent: 100,
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide,
          preview: false,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
        }
      ];
      this.loadProduct()
    });
  }

  loadProduct() {
    if (this.ProductId) {
      this.productService.loadProduct(this.ProductId).pipe(take(1)).subscribe({
        next: response => {
          this.product = response;
          console.log(this.product);
          this.galleryImages = this.loadImages();
        }
      })
    } else {
      this.router.navigate(['/products' ]);

    }
  }

  loadImages() {
    if (!this.product) return [];
    if (this.product.photos.length == 0) return [];

    const imageUrls = [];
    for (const photo of this.product.photos) {
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      })
    }
    console.log(imageUrls);
    return imageUrls;
  }

  editProduct(){
    if(this.product){
      this.productService.product = this.product;
      this.router.navigate(["/edit-product/"+this.product.id])
    }
    
  }

}
