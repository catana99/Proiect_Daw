import { ImagesService } from './images.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class EventsService {

    constructor(private firestore: AngularFirestore, private imagesService: ImagesService) {}

    addEvent(event: any) {
        return new Promise<any>((resolve, reject) =>{
            this.firestore
                .collection("Events")
                .add(event)
                .then(res => {
                }, err => reject(err));
        });
    }

    getEvents() {
        return this.firestore.collection("Events").snapshotChanges();
    }


    //la update e nevoie de id-ul evenimentului si de proprietatile ce s-au schimbat la el
    updateEvent(eventId: any, eventToUpdateData: any) {
        return this.firestore
        .collection("Events")
        .doc(eventId)
        .set({ name: eventToUpdateData.name, //in set se pun toate proprietatile ce se doresc a fi updatate
               description: eventToUpdateData.description,
               date:  eventToUpdateData.date},
             { merge: true });

    }
    //Atunci cand se sterge un eveniment,trebuie sterse si toate imaginile apartinand acelui eveniment

    deleteEvent(event: any) {
        this.imagesService.deleteAllImagesOfAnEvent(event.payload.doc.id);
        return this.firestore
       .collection("Events")
       .doc(event.payload.doc.id)
       .delete();
    }


}
