import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sharedprofile',
  templateUrl: './sharedprofile.component.html',
  styleUrls: ['./sharedprofile.component.css']
})
export class SharedprofileComponent implements OnInit {
  prod;
  loginform;
  alltitiles;
  activetitles;
  username;
  constructor(private router:Router,private activatedroute:ActivatedRoute) {
    this.prod = [{title:"Facebook",url:"https://www.facebook.com"},{title:"Youtube",url:"https://www.youtube.com"},{title:"Instagram",url:"https://www.instagram.com"}]
    this.alltitiles=this.prod;
    this.activetitles=this.alltitiles;
    this.username=this.activatedroute.snapshot.params.id
   }

  ngOnInit(): void {
  }
  redirect(url)
  {
    console.log(url)
    window.open(url, "_blank");
  }
}
