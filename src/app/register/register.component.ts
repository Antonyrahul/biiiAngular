import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import {UrlService} from '../url.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerform;
  constructor(private urlservice:UrlService,private router:Router) {
    this.registerform = new FormGroup({
      firstname : new FormControl('',Validators.required),
      lastname : new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      confirmpassword: new FormControl('',Validators.required)
   })
  }

  ngOnInit(): void {
  }

  processdata()
  {
    if(this.registerform.valid)
    console.log(this.registerform.value)
    this.urlservice.registerUser(this.registerform.value).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['login'])

    })
  }

}
