import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Comment_ } from '../models/comment';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends RepositoryService {

  constructor(
    http: HttpClient
  ) {
    super(http);
    this.endpoint = 'comments';
    this.url += this.endpoint;
  }

  getCommentsByPost(id: number): Observable<Comment_[]> {
    return this.http.get<any>(`${this.url}/${id}`);
  }
}
