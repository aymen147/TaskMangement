import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:"signin",component:SignInComponent},
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"",redirectTo: "home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
