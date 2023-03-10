import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserToken } from '../models/userToken';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject< UserToken | null >(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }


  login(model : any){
    console.log(model);
    return this.http.post<UserToken>(this.baseUrl + "account/login/", model).pipe(
      map(( response : UserToken) => {
        var user = response ;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }
  signup(modal : any){
    return this.http.post<UserToken>(this.baseUrl + "account/register/", modal).pipe(
      map(( response : UserToken) => {
        var user = response ;
        if(user){
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: UserToken){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }


}

