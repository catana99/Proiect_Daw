import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class UsersService {

    constructor(private firestore: AngularFirestore) {}

        addUser(user: any) { //user composed from email and password (those are added in the application when we sign up)
            return new Promise<any>((resolve, reject) =>{
                this.firestore
                    .collection("Users")
                    .add(user)
                    .then(res => {}, err => reject(err));
            });
        }

        getUsers() {
            return this.firestore.collection("Users").snapshotChanges();
        }
}
