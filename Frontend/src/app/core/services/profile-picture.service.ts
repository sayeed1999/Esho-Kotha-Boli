import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ViewProfilePicture } from '../models/viewProfilePicture';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService extends RepositoryService {

  dpUpdated = new Subject<boolean>();

  constructor(
    http: HttpClient
  ) {
    super(http);
    this.endpoint = 'profile-picture';
    this.url += this.endpoint;
  }

  getProfilePictureByUsername(username: string): Observable<string> { // returns base64 string
    return this.http.get<ViewProfilePicture>(this.url + '/' + username)
      .pipe(
        map((res: ViewProfilePicture) => {
          let base64!: string;
          base64 = res.byteArray;
          if(!!base64) {
            base64 = 'data:image/jpg;base64,' + base64; // this.base64 is a String
          }
          else {
            base64 = 'assets/user.jpg';
          }
          return base64;
        })
      );
  }
}
