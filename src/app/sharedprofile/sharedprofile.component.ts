import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import {UrlService} from '../url.service'
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
  constructor(private router:Router,private activatedroute:ActivatedRoute,private urlservice:UrlService) {
 
   // this.prod = [{title:"Facebook",url:"https://www.facebook.com"},{title:"Youtube",url:"https://www.youtube.com"},{title:"Instagram",url:"https://www.instagram.com"}]

    this.username=this.activatedroute.snapshot.params.id
    this.urlservice.geturls({firstname:this.username}).subscribe((data)=>{
      console.log(data);
      console.log(data.data);
      console.log(data.data.biiiurls)
      this.prod=data.data.biiiurls
      this.alltitiles=this.prod;
      this.activetitles=this.alltitiles.filter((item)=>{
        return item.state==true
      })
    })
   }

  ngOnInit(): void {
  }
  redirect(url)
  {
    console.log(url)
    window.open("//"+url, "_blank");
  }
}
