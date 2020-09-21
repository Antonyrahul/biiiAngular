import { Injectable } from '@angular/core';

import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  constructor(private http:HttpClient) { }
  registerUser(data):Observable<any>{
    console.log(data)
    return this.http.post("https://urlshortnerappantony.herokuapp.com/registeruser",data)
  }

  loginUser(data):Observable<any>{
    console.log(data)
    return this.http.post("https://urlshortnerappantony.herokuapp.com/loginuser",data)
  }

}
