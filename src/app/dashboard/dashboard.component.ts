import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';
import {UrlService} from '../url.service'

import { ClipboardService } from 'ngx-clipboard'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  prod;
  loginform;
  alltitiles;
  activetitles;
  activetitlesname;
  dispname="";
  public title="";
  
  constructor(private _clipboardService: ClipboardService, private urlservice:UrlService) {
    console.log("in")
    this.urlservice.geturls({email:localStorage.getItem("email")}).subscribe((data)=>{
      console.log(data);
      this.prod=data.data;
      this.alltitiles=this.prod.biiiurls;
      this.dispname=this.prod.firstname
      this.activetitles=this.alltitiles.filter((item)=>{
        return item.state==true
      })
    })
   // this.prod = [{title:"Facebook",url:"https://www.facebook.com"},{title:"Youtube",url:"https://www.youtube.com"},{title:"Instagram",url:"https://www.instagram.com"}]
    // this.alltitiles=this.prod;
    // this.activetitles=this.alltitiles;

    this.loginform = new FormGroup({
      url:new FormControl('',[Validators.required]),
      title:new FormControl('',[Validators.required]),
      entertext:new FormControl(''),

     
      
    })
    
  }

  ngOnInit(): void {
 
  }

  toggleclick(toggleid) {
    var menuarr = ["homeicon", "lineicon", "palleticon", "settingsicon"]

    console.log(toggleid)
    console.log(activemenu)
    for (var i of menuarr) {
      if (i == toggleid) {
        var activemenu = document.getElementById(i);
        activemenu.setAttribute("stroke", "#006DFF");
        activemenu.setAttribute("fill", "#006DFF")
      }
      else {
        var notactivemenu = document.getElementById(i)
        notactivemenu.removeAttribute("stroke")
        notactivemenu.removeAttribute("fill")
      }
    }
  }

  copytoclipboard() {
    console.log("clip")
    var result = this._clipboardService.copyFromContent("biii.netlify.app/"+this.prod.firstname)
    console.log(result)
  }
  turnofflink(titilename,state){
  

      
      console.log(titilename)
      console.log(state)
  
      this.urlservice.changelinkstate({email:localStorage.getItem("email"),state:state,title:titilename}).subscribe((data)=>{
        console.log(data);
       
  
      })
      this.urlservice.geturls({email:localStorage.getItem("email")}).subscribe((data)=>{
        console.log(data);
        this.prod=data.data.biiiurls;
        this.alltitiles=this.prod;
        this.activetitles=this.alltitiles.filter((item)=>{
          return item.state==true
        })
      })

  
    //   this.activetitlesname= this.activetitles.map((ele)=>{
    //   return ele.title;
    //   }
     
    //   )
    //   console.log(this.activetitlesname)
    //   if(this.activetitlesname.includes(titilename))
    //   {
    //   this.activetitles=this.alltitiles.filter((titles)=>{
    //     console.log(titles)
    //            return titles.title!=titilename;
    //   })
    //   console.log(this.activetitles)
    // }
  
    // else{
    //   this.activetitles.push(titilename)
    // }
      console.log(this.activetitles)
    


  }

  openmodal(){
    var modal = document.getElementById("myModal1");
    var maindiv = document.getElementById("maindiv")
    modal.style.display = "block";
    maindiv.style.filter="blur(4px)";
    
    
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
        maindiv.style.filter="blur(0px)";
      }
  }
}
  processdata(){
    console.log("process")
    var modal = document.getElementById("myModal1");
    var maindiv = document.getElementById("maindiv")
    if(this.loginform.valid)
    {
      this.loginform.value.email=localStorage.getItem("email");
      this.loginform.value.state=true;
      console.log("pocha")
      console.log(this.loginform.value)
      this.urlservice.storeurl(this.loginform.value).subscribe((data)=>{
        console.log(data)
      
        modal.style.display = "none";
        maindiv.style.filter="blur(0px)";
        this.urlservice.geturls({email:localStorage.getItem("email")}).subscribe((data)=>{
          console.log(data);
          this.prod=data.data;
          this.alltitiles=this.prod.biiiurls;
          this.activetitles=this.alltitiles.filter((item)=>{
            return item.state==true
          })
        })
        
      })

    }
    else{
      console.log("not valid")
    }
}
}
