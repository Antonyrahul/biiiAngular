import { Component, OnInit } from '@angular/core';

import {ClipboardService} from'ngx-clipboard'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  prod;
  constructor(private _clipboardService: ClipboardService) { 
    this.prod=["Dribble","Portfolio","Behance"]
  }

  ngOnInit(): void {
  }
  toggleclick(toggleid)
  {
    var menuarr = ["homeicon","lineicon","palleticon","settingsicon"]
    
    console.log(toggleid)
    console.log(activemenu)
    for(var i of menuarr)
    {
      if(i==toggleid)
      {
      var activemenu =document.getElementById(i);
    activemenu.setAttribute("stroke","#006DFF");
    activemenu.setAttribute("fill","#006DFF")
      }
      else
      {
        var notactivemenu = document.getElementById(i)
        notactivemenu.removeAttribute("stroke")
        notactivemenu.removeAttribute("fill")
      }
    }


  }
  copytoclipboard(copytext)
  {
    console.log("clip")
   var result= this._clipboardService.copyFromContent(copytext)
   console.log(result)

  }

}
