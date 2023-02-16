import { Component, OnInit } from '@angular/core';
import { UserToken } from './models/userToken';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'MarketplaceFrontEnd';

  constructor(private accountService : AccountService){

  }
  ngOnInit(): void {
     this.setCurrentUser();
  }

  setCurrentUser(){
    const userString = localStorage.getItem('user');
    if(!userString) return;
    const user : UserToken = JSON.parse(userString);
    this.accountService.setCurrentUser(user);
  }


}
