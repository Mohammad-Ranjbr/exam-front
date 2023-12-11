import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  public generateToken(loginData:any){
    return this.http.post(`${baseUrl}/api/v1/authentication/login`,loginData);
  }

  // loginUser : set token in local storage

  public loginUser(token:any){
    localStorage.setItem('token',token);
    return true;
  }

  // isLogin : user is login or not

  public isLoggedIn(){
    let token=localStorage.getItem('token');
    if(token == undefined || token == '' || token == null){
      return false;
    } else {
      return true;
    }
  }

  // getCurrentUser : witch is logged in

  public getCurrentUser(){
    return this.http.get(`${baseUrl}/api/v1/authentication/current-user`);
  }

  // logout : remove token from local storage

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  // get token

  public getToken(){
    return localStorage.getItem('token');
  }

  // set userDetails

  public setUser(user:any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  // get user

  public getUser(){
    let user = localStorage.getItem('user');
    if(user != null){
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  // get user role

  public getUserRole(){
    let user = this.getUser();
    return user.roles[0].role;
  }

}
