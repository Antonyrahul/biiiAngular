import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('jwtToken');
    

   }

  ngOnInit(): void {
  }

}
