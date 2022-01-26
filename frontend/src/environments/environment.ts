// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//legatura cu baza de date
export const environment = {
  production: false,
  firebase : {
    apiKey: "AIzaSyDSmIZVF5ePhLd4ioNbNixIjlWNbxR6ILA",
    authDomain: "blogdb-com.firebaseapp.com",
    databaseURL: "https://blogdb-com.firebaseio.com",
    projectId: "blogdb-com",
    storageBucket: "blogdb-com.appspot.com",
    messagingSenderId: "913165487263"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


