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
    return this.http.post("http://ec2-18-208-158-165.compute-1.amazonaws.com:4123/registeruser",data)
  }

  loginUser(data):Observable<any>{
    console.log(data)
    return this.http.post("http://ec2-18-208-158-165.compute-1.amazonaws.com:4123/loginuser",data)
  }
  storeurl(data):Observable<any>{
    return this.http.post("https://ec2-54-227-211-140.compute-1.amazonaws.com/storeurl",data)
  }
  geturls(data):Observable<any>
  {
    return this.http.post("https://ec2-54-227-211-140.compute-1.amazonaws.com/geturlsbiii",data)
  }
  changelinkstate(data):Observable<any>{
    return this.http.post("https://ec2-54-227-211-140.compute-1.amazonaws.com/changelinkstate",data)
  }
  setupSocketConnection() {
    this.socket = io("https://ec2-54-227-211-140.compute-1.amazonaws.com");
    this.socket.on("hello pepes",(msg)=>{
      console.log(msg)
    })
  }
  createorder(data):Observable<any>{
    return this.http.post("http://localhost:4123/payment",data)
  }
  securepayment(data):Observable<any>{
    return this.http.post("http://localhost:4123/secure",data)
  }
  stripepay(data):Observable<any>{
    return this.http.post("http://localhost:4123/create-session",data)
  }

}
//http://localhost:4123
//https://urlshortnerappantony.herokuapp.com
//https://ec2-54-227-211-140.compute-1.amazonaws.com
//https://https://ec2-54-227-211-140.compute-1.amazonaws.com/