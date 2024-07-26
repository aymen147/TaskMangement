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
import { TaskListComponent } from './task-list/task-list.component';
import { authGuard } from './auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RoleGuard } from './role.guard';
import { CreateTaskComponent } from './create-task/create-task.component';
import { UpdateTaskComponent } from './update-task/update-task.component';

const routes: Routes = [
  {path:"signin",component:SignInComponent},
  {path:"home",component:HomeComponent},
  {path:"signup",component:SignUpComponent},
  {path:"login",component:LoginComponent},
  {path:"dashbord",component:HeaderDashbordComponent,canActivate:[authGuard,RoleGuard]},
  {path:"users",component:ListUserComponent,canActivate:[authGuard,RoleGuard]},
  {path:"update/:id",component:UpdateUserComponent,canActivate:[authGuard,RoleGuard]},
  {path:"updateTask/:id",component:UpdateTaskComponent,canActivate:[authGuard]},
  {path:"createAdmin",component:CreateUserComponent,canActivate:[authGuard,RoleGuard]},
  {path:"Tasks",component:TaskListComponent,canActivate:[authGuard]},
  {path:"unauthorized", component:UnauthorizedComponent},
  {path:"Tasks/createTask",component:CreateTaskComponent,canActivate:[authGuard]},
  {path:"",redirectTo: "home",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
