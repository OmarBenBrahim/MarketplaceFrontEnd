import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

import { ProductParams } from 'src/app/models/productParams';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  userName : string | undefined;
  productParams = new FormGroup({
    categorie : new FormControl(),
    state : new FormControl(),
    minPrice : new FormControl(),
    maxPrice : new FormControl(),
  });
  constructor(private router : Router, private route : ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {

        if(params['userName']){
          this.userName = params['userName']
        }else{
          this.userName = undefined;
        }

        this.productParams.patchValue({
          categorie : (params['categorie']) ? this.productParams.value.categorie = params['categorie'] :'',
          state : (params['state']) ? this.productParams.value.state = params['state'] : '' ,
          minPrice : (params['minPrice']) ? this.productParams.value.minPrice = params['minPrice'] : '' ,
          maxPrice : (params['maxPrice']) ? this.productParams.value.maxPrice = params['maxPrice'] : '',
        })
      });
  }

  ApplyFilter(){
    let prodParams = this.clean(this.productParams.value);
    this.router.navigate(
      [`/products`] ,
      { queryParams : prodParams }
    )
  }

  clean(obj : any) {
    for (var propName in obj) {
      if (obj[propName] === null || obj[propName] === undefined  || obj[propName] === '') {
        delete obj[propName];
      }
    }
    if(this.userName){
      obj.userName = this.userName
    }
    return obj
  }

  

}
