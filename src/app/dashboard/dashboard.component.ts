import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators} from'@angular/forms';

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
  activetitles
  constructor(private _clipboardService: ClipboardService) {
    this.prod = ["Dribble", "Portfolio", "Behance"]
    this.alltitiles=this.prod;
    this.activetitles=this.alltitiles;

    this.loginform = new FormGroup({
      url:new FormControl('',[Validators.required]),
      title:new FormControl('',[Validators.required]),
      entertext:new FormControl('',[Validators.required]),

     
      
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

  copytoclipboard(copytext) {
    console.log("clip")
    var result = this._clipboardService.copyFromContent(copytext)
    console.log(result)
  }
  turnofflink(titilename){

    console.log(titilename)
    if(this.activetitles.includes(titilename))
    {
    this.activetitles=this.alltitiles.filter((titles)=>{
      console.log(titles)
             return titles!=titilename;
    })
  }
  else{
    this.activetitles.push(titilename)
  }
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
}
}
