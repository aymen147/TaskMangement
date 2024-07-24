import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { HeroComponent } from './hero/hero.component';
import { FooterComponent } from './footer/footer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HeaderDashbordComponent } from './header-dashbord/header-dashbord.component';
import { ListUserComponent } from './list-user/list-user.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { TaskListComponent } from './task-list/task-list.component';
import { SidebarAdminComponent } from './sidebar-admin/sidebar-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    SignInComponent,
    HeaderComponent,
    HeroComponent,
    FooterComponent,
    LoginComponent,
    HeaderDashbordComponent,
    ListUserComponent,
    SidebarComponent,
    UpdateUserComponent,
    CreateUserComponent,
    TaskListComponent,
    SidebarAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule 
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
