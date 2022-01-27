import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '../auth/auth.module';

import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { EventsService } from './events.service';
import { UsersService } from './users.service';
import { ImagesService } from './images.service';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from './categories.service';

@NgModule({
  providers: [
    EventsService,
    UsersService,
    ImagesService,
    CategoriesService
  ],
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    AuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    HttpClientModule
  ]
})
export class CoreModule { }

