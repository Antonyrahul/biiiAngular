import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import {UrlService} from '../url.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginform;
  constructor(private urlservice:UrlService,private router:Router) { 
    this.loginform = new FormGroup({
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
     
      
    })
  }

  ngOnInit(): void {
  }
  processdata()
  {
    if(this.loginform.valid)
    console.log(this.loginform.value)
    this.urlservice.loginUser(this.loginform.value).subscribe((data)=>{
      console.log(data)
      if(data.status ==200)
      {
      console.log("logged in")
      localStorage.setItem('name', data.name);
      localStorage.setItem('email',data.email);
      localStorage.setItem('jwtToken',data.jwttoken)
      
      this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
      }
      else
      console.log("failed")

    })
  }

}
