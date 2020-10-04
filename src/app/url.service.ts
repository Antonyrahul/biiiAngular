import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
socket;
  constructor(private http:HttpClient) { }
  registerUser(data):Observable<any>{
    console.log(data)
    return this.http.post("https://urlshortnerappantony.herokuapp.com/registeruser",data)
  }

  loginUser(data):Observable<any>{
    console.log(data)
    return this.http.post("https://urlshortnerappantony.herokuapp.com/loginuser",data)
  }
  storeurl(data):Observable<any>{
    return this.http.post("https://urlshortnerappantony.herokuapp.com/storeurl",data)
  }
  geturls(data):Observable<any>
  {
    return this.http.post("https://urlshortnerappantony.herokuapp.com/geturlsbiii",data)
  }
  changelinkstate(data):Observable<any>{
    return this.http.post("https://urlshortnerappantony.herokuapp.com/changelinkstate",data)
  }
  // setupSocketConnection() {
  //   this.socket = io("https://urlshortnerappantony.herokuapp.com");
  //   this.socket.on("hello pepes",(msg)=>{
  //     console.log(msg)
  //   })
  // }

}
//http://localhost:4123
//https://urlshortnerappantony.herokuapp.com