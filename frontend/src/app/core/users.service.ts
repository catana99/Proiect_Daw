import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsersService {

    constructor(private firestore: AngularFirestore, private httpClient: HttpClient) {}
    private formatErrors(error: any) {
      return  throwError(error.error);
    }
        addUser(user: any) { //user composed from email and password (those are added in the application when we sign up)
          var path = "User/Add";
          return this.httpClient.post(
            `${environment.api_url}${path}`,
            JSON.stringify(user)
          ).pipe(catchError(this.formatErrors));
            /*return new Promise<any>((resolve, reject) =>{
                this.firestore
                    .collection("Users")
                    .add(user)
                    .then(res => {}, err => reject(err));
            });*/
        }

        getUsers() {
          var path = "User/GetAll";
          return this.httpClient.get(`${environment.api_url}${path}`,)
          .pipe(map((data:Array<Event>)=> data))
          .pipe(catchError(this.formatErrors));
            //return this.firestore.collection("Users").snapshotChanges();
        }
}
