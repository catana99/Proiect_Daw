import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class ImagesService {

    constructor(private firestore: AngularFirestore) {}

    addImage(image: any) { //compusa din base64string si eventId
        return new Promise<any>((resolve, reject) =>{
            this.firestore
                .collection("Images")
                .add(image)
                .then(res => {}, err => reject(err));
        });
    }

    //se ia toata lista de imagini
    getImages() {
        return this.firestore.collection("Images").snapshotChanges();
    }


    //se iau doar imaginile asociate unui eveniment
    getImagesByEventId(eventId: any) {
        let imagesRef = this.firestore.collection("Images").ref; //toata colectia de imagini
        return imagesRef.where("eventId","==",eventId); //doar imaginile care au eventId = id-ul evenimentului pentru care se vrea lista de imagini
        //Pentru a lua documentele din colectia filtrata

    }

    deleteImage(imagePayloadDocId: any) {
        return this.firestore
       .collection("Images")
       .doc(imagePayloadDocId)
       .delete();
    }

    //Atunci cand se sterge un eveniment, trebuie sterse si toate imaginile apartinand acelui eveniment
    deleteAllImagesOfAnEvent(eventId: any) {
        //se iau toate imaginile apartinand evenimentului
        let eventImages = this.getImagesByEventId(eventId);

           eventImages.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.deleteImage(doc.id); //sterg fiecare imagine
               //id-ul e doc.id
               //proprietatile le gasesc doc.data() --> doc.data().base64string
            });
        });
    }

}
