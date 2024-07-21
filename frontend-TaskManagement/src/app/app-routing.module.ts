import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { LoginComponent } from './login/login.component';
import { HeaderDashbordComponent } from './header-dashbord/header-dashbord.component';
import { ListUserComponent } from './list-user/list-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';

const routes: Routes = [
  {path:"signin",component:SignInComponent},
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"dashbord",component:HeaderDashbordComponent},
  {path:"users",component:ListUserComponent},
  {path:"update/:id",component:UpdateUserComponent},
  {path:"createAdmin",component:CreateUserComponent},
  {path:"",redirectTo: "home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
