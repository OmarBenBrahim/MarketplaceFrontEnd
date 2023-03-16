import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model : any = {}
  user? : User ;

  constructor(private accountService : AccountService, private router : Router, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.model)
    .subscribe({
      next :() => {
        this.toastr.success('success', 'You are successfully logged in');
        this.router.navigateByUrl('/products')
      },
    })
    
  }

}
