import { ImagesService } from './images.service';
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class CategoriesService {

    constructor(private httpClient: HttpClient) {}
    private formatErrors(error: any) {
      return  throwError(error.error);
    }

    getCategories() {
      var path = "Category/GetAll";
      return this.httpClient.get(`${environment.api_url}${path}`)
      .pipe(map((data: Array<any>)=> data))
    }


}
