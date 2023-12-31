import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient) { }

  // load all categories

  public getCategory(){
    return this._http.get(`${baseUrl}/api/categories/`);
  }

  public addCategory(category:any){
    return this._http.post(`${baseUrl}/api/categories/`,category);
  }

}
