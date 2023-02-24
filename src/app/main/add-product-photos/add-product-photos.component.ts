import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
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

  constructor(private productService : ProductsService, private accountService : AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next : user => {
        if(user) this.user = user;
      }
    })
   }

  ngOnInit(): void {
    this.initializeUploader();
  }

  fileOverBase(e:any){
    this.hasBaseDropZoneOver = e ;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url : this.baseUrl + 'product/addPhoto/' + this.productService.product.id,
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
        console.log(response);
      }
    }
  }


  
}
