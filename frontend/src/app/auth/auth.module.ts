import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { AddEventComponent } from './add-event/add-event.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AssociateImageToEventComponent } from './associate-image-to-event/associate-image-to-event.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';

import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { GrowlModule } from 'primeng/growl';
import { CardModule } from 'primeng/card';
import { dateFormatPipe } from '../pipes/date.format.pipe';
import { MyRedDirective } from '../directives/color-red.directive';


const routes: Routes =[
  {path: '', component: SigninComponent, data: { title: 'Sign in'}},
  {path: 'home', component: HomeComponent},
  {path: 'signup', component: SignupComponent, data: { title: 'Sign up'}},
  {path: 'add-event', component: AddEventComponent},
  {path: 'view-events', component: ViewEventsComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'associate-image', component: AssociateImageToEventComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'about', component: AboutComponent}
]


@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    ConfirmDialogModule,
    DialogModule,
    DropdownModule,
    FileUploadModule,
    GrowlModule,
    CardModule
  ],
  declarations: [
    HomeComponent,
    SigninComponent,
    SignupComponent,
    AddEventComponent,
    ViewEventsComponent,
    GalleryComponent,
    AssociateImageToEventComponent,
    ContactComponent,
    AboutComponent,
    dateFormatPipe,
    MyRedDirective
  ],
  providers: [
    ConfirmationService,
    MessageService
  ]
})
export class AuthModule { }
