import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CityList } from '../models/TunisaCity';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {
  cityList = new CityList();
  tunisiaCity = this.cityList.TunisiaCity;

  signupForm = new FormGroup({
    userName : new FormControl('', [Validators.required]),
    phoneNumber : new FormControl('', [Validators.required]),
    password : new FormControl('', [Validators.required]),
    city : new FormControl('', [Validators.required]),
    state : new FormControl('', [Validators.required]),
  });


  constructor(private accountService : AccountService, private router : Router) { }

  ngOnInit(): void {
    console.log(this.tunisiaCity)
  }

  CreateAccount(){
    this.accountService.signup(this.signupForm.value).subscribe({
      next :() => {
        this.router.navigateByUrl('/products')
      }
    })
  }



}
