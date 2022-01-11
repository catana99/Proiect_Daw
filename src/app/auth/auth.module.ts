import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes =[
  {path: '', component: SigninComponent, data: { title: 'Sign in'}},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent, data: { title: 'Sign up'}}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    HomeComponent,
    SigninComponent,
    SignupComponent
  ]
})
export class AuthModule { }
