import { HttpClient } from '@angular/common/http';
import { Byte } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends RepositoryService {

  constructor(
    http: HttpClient
  ) {
    super(http);
    this.endpoint = 'images';
    this.url += this.endpoint;
  }

  uploadProfilePicture(image: File): Observable<any> {
    const uploadData = new FormData();
    uploadData.append('image', image)

    return this.http.post(
      this.url + '/' + 'upload-profile-picture',
      uploadData
    );
  }
  
}
