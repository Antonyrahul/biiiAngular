import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component'
import {SharedprofileComponent} from './sharedprofile/sharedprofile.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {LogoutComponent} from './logout/logout.component'


const routes: Routes = [
  {
    path:"dash",
    component:DashboardComponent
  }, 
  {
    path:"",
    component:DashboardComponent
    
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"register",
    component:RegisterComponent
  },
  {
    path:"logout",
    component:LogoutComponent
  },
  {
    path:":id",
    component:SharedprofileComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
