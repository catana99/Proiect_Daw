import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes =[
  {path: '', loadChildren: './auth/auth.module#AuthModule'},
  {path: 'users', loadChildren: './user/user.module#UserModule'}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

