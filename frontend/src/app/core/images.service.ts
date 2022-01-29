import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImagesService {
    httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    options = {headers: this.httpHeaders};
    constructor(private firestore: AngularFirestore, private httpClient: HttpClient) {}
    private formatErrors(error: any) {
      return  throwError(error.error);
    }
    addImage(image: any) { //compusa din base64string si eventId
      var path = "/EventImages/AddImage";
      return this.httpClient.post(
        `${environment.api_url}${path}?eventId=${image.eventId}`,
        JSON.stringify(image.base64string), this.options
      ).pipe(catchError(this.formatErrors));
    }

    //se ia toata lista de imagini
    getImages() {
      var path = "/EventImages/GetImages";
      return this.httpClient.get(`${environment.api_url}${path}`,)
      .pipe(map((data:Array<any>)=> data))
      .pipe(catchError(this.formatErrors));
    }


    //se iau doar imaginile asociate unui eveniment
    getImagesByEventId(eventId: any): Observable<Array<any>> {
      var path = "/EventImages/GetImagesByEventId";
      return this.httpClient.get(`${environment.api_url}${path}?eventId=`+eventId)
      .pipe(map((data:Array<any>)=> data))
      .pipe(catchError(this.formatErrors));
    }

    deleteImage(imagePayloadDocId: any) {
      var path = "/EventImages/DeleteImage";
      return this.httpClient.delete(
        `${environment.api_url}${path}?id=`+imagePayloadDocId
      ).pipe(catchError(this.formatErrors));
    }

    //Atunci cand se sterge un eveniment, trebuie sterse si toate imaginile apartinand acelui eveniment
    deleteAllImagesOfAnEvent(eventId: any) {
      var path = "/EventImages/DeleteImage";
      return this.httpClient.delete(
        `${environment.api_url}${path}?id=`+eventId
      ).pipe(catchError(this.formatErrors));
    }

}
