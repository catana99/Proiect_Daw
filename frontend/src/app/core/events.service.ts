import { ImagesService } from './images.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class EventsService {
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    options = {headers: this.httpHeaders};
    constructor(private firestore: AngularFirestore, private imagesService: ImagesService, private httpClient: HttpClient) {}
    private formatErrors(error: any) {
      return  throwError(error.error);
    }
    addEvent(event: any) {
      var path = "/Events/AddEvent";
      var completeUrl = `${environment.api_url}${path}?id=${event.id}&name=${encodeURIComponent(event.name)}&description=${encodeURIComponent(event.description)}&date=${encodeURIComponent(event.date)}`;
      var value = [];
      for(var category of event.categories){
        value.push(category.id);
      }
      return this.httpClient.post(
        completeUrl, value, this.options
      ).pipe(catchError(this.formatErrors));
    }

    getEvents() {
      var path = "/Events/GetEvents";
      return this.httpClient.get(`${environment.api_url}${path}`)
      .pipe(map((data: Array<any>)=> data))
    }

    updateEvent(eventId: any, eventToUpdateData: any) {
      var path = "/Events/UpdateEvent";
      var completeUrl = `${environment.api_url}${path}?id=${eventToUpdateData.id}&name=${encodeURIComponent(eventToUpdateData.name)}&description=${encodeURIComponent(eventToUpdateData.description)}&date=${encodeURIComponent(eventToUpdateData.date)}`;
      var value = [];
      for(var category of eventToUpdateData.categories){
        value.push(category.id);
      }
      return this.httpClient.patch(
        completeUrl, value, this.options
      ).pipe(catchError(this.formatErrors));

    }

    deleteEvent(event: any) {
      var path = "/Events/DeleteEvent";
      return this.httpClient.delete(
        `${environment.api_url}${path}?eventId=`+event.id, this.options
      ).pipe(catchError(this.formatErrors));

    }

    getSummary() {
      var path = "/Events/GetSummary";
      return this.httpClient.get(`${environment.api_url}${path}`)
      .pipe(map((data: Array<any>)=> data))
    }


}
