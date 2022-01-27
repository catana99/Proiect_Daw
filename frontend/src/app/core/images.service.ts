import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class ImagesService {

    constructor(private firestore: AngularFirestore, private httpClient: HttpClient) {}
    private formatErrors(error: any) {
      return  throwError(error.error);
    }
    addImage(image: any) { //compusa din base64string si eventId
      var path = "Image/Add";
      return this.httpClient.post(
        `${environment.api_url}${path}`,
        JSON.stringify(image)
      ).pipe(catchError(this.formatErrors));
        /*return new Promise<any>((resolve, reject) =>{
            this.firestore
                .collection("Images")
                .add(image)
                .then(res => {}, err => reject(err));
        });*/
    }

    //se ia toata lista de imagini
    getImages() {
      var path = "Image/GetAll";
      return this.httpClient.get(`${environment.api_url}${path}`,)
      .pipe(map((data:Array<any>)=> data))
      .pipe(catchError(this.formatErrors));
        //return this.firestore.collection("Images").snapshotChanges();
    }


    //se iau doar imaginile asociate unui eveniment
    getImagesByEventId(eventId: any): Observable<Array<any>> {
      var path = "Image/Get";
      return this.httpClient.get(`${environment.api_url}${path}?id=`+eventId)
      .pipe(map((data:Array<any>)=> data))
      .pipe(catchError(this.formatErrors));
        //let imagesRef = this.firestore.collection("Images").ref; //toata colectia de imagini
        //return imagesRef.where("eventId","==",eventId); //doar imaginile care au eventId = id-ul evenimentului pentru care se vrea lista de imagini
        //Pentru a lua documentele din colectia filtrata

    }

    deleteImage(imagePayloadDocId: any) {
      var path = "Image/Delete";
      return this.httpClient.delete(
        `${environment.api_url}${path}?id=`+imagePayloadDocId
      ).pipe(catchError(this.formatErrors));
        /*return this.firestore
       .collection("Images")
       .doc(imagePayloadDocId)
       .delete();*/
    }

    //Atunci cand se sterge un eveniment, trebuie sterse si toate imaginile apartinand acelui eveniment
    deleteAllImagesOfAnEvent(eventId: any) {
      var path = "Image/DeleteAll";
      return this.httpClient.delete(
        `${environment.api_url}${path}?id=`+eventId
      ).pipe(catchError(this.formatErrors));
        //se iau toate imaginile apartinand evenimentului
        /*
        let eventImages = this.getImagesByEventId(eventId);

           eventImages.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.deleteImage(doc.id); //sterg fiecare imagine
               //id-ul e doc.id
               //proprietatile le gasesc doc.data() --> doc.data().base64string
            });
        });*/
    }

}
