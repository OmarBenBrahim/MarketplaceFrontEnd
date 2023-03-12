import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { Subscription, take } from 'rxjs';
import { Photo } from 'src/app/models/photo';
import { User } from 'src/app/models/user';
import { UserToken } from 'src/app/models/userToken';
import { AccountService } from 'src/app/services/account.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-product-photos',
  templateUrl: './add-product-photos.component.html',
  styleUrls: ['./add-product-photos.component.scss']
})
export class AddProductPhotosComponent implements OnInit {
  uploader : FileUploader | undefined ;
  hasBaseDropZoneOver = false ;
  baseUrl = environment.apiUrl;
  user : UserToken | undefined;
  ProductId : Number | undefined;
  private routeSub: Subscription | undefined;
  constructor(public productService : ProductsService, private accountService : AccountService,private route: ActivatedRoute) {
    
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next : user => {
        if(user) this.user = user;
      }
    })
    this.routeSub = this.route.params.pipe(take(1)).subscribe(params => {
      this.ProductId = params['id'];
      if (this.ProductId) {
        this.productService.loadProduct(this.ProductId).pipe(take(1)).subscribe({
          next: response => {
            this.productService.product = response;
            console.log(this.productService.product.photos)
          }
        })
      }
        
    });
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e ;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url : this.baseUrl + 'product/addPhoto/' + this.ProductId,
      authToken : 'Bearer '+ this.user?.token,
      isHTML5 : true,
      allowedFileType : ['image'],
      removeAfterUpload : true,
      autoUpload : false,
      maxFileSize: 10 * 1024 *1014
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    this.uploader.onSuccessItem = (item , response, status , headers ) => {
      if(response){
        let photo = JSON.parse(response);
        console.log(photo);
        this.productService.product.photos.push(photo);
      }
    }
  }

  deletePhoto(photo : Photo){
    this.productService.deletePhoto(photo);
  }


  
}
