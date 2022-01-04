import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  getProfilePictureByUsername(username: string): Observable<any> {
    return this.http.get(this.url + '/' + username);
  }
}
