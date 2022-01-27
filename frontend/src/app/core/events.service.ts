import { ImagesService } from './images.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class EventsService {

    constructor(private firestore: AngularFirestore, private imagesService: ImagesService, private httpClient: HttpClient) {}
    private formatErrors(error: any) {
      return  throwError(error.error);
    }
    addEvent(event: any) {
      var path = "Event/Add";
      return this.httpClient.post(
        `${environment.api_url}${path}`,
        JSON.stringify(event)
      ).pipe(catchError(this.formatErrors));
        /*return new Promise<any>((resolve, reject) =>{
            this.firestore
                .collection("Events")
                .add(event)
                .then(res => {
                }, err => reject(err));
        });*/
    }

    getEvents() {
      var path = "Event/GetAll";
      return this.httpClient.get(`${environment.api_url}${path}`)
      .pipe(map((data: Array<any>)=> data))
        //return this.firestore.collection("Events").snapshotChanges();
    }


    //la update e nevoie de id-ul evenimentului si de proprietatile ce s-au schimbat la el
    updateEvent(eventId: any, eventToUpdateData: any) {
      var path = "Event/Update";
      return this.httpClient.patch(
        `${environment.api_url}${path}`,
        JSON.stringify(eventToUpdateData)
      ).pipe(catchError(this.formatErrors));

        /*return this.firestore
        .collection("Events")
        .doc(eventId)
        .set({ name: eventToUpdateData.name, //in set se pun toate proprietatile ce se doresc a fi updatate
               description: eventToUpdateData.description,
               date:  eventToUpdateData.date},
             { merge: true });*/

    }
    //Atunci cand se sterge un eveniment,trebuie sterse si toate imaginile apartinand acelui eveniment

    deleteEvent(event: any) {
      var path = "Event/Delete";
      return this.httpClient.delete(
        `${environment.api_url}${path}?id=`+event.id
      ).pipe(catchError(this.formatErrors));

        /*this.imagesService.deleteAllImagesOfAnEvent(event.payload.doc.id);
        return this.firestore
       .collection("Events")
       .doc(event.payload.doc.id)
       .delete();*/
    }


}
