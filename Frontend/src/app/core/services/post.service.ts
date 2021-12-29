import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { PostSummary } from 'src/app/core/models/postSummaryt';
import { Comment_ } from '../models/comment';
import { Post } from '../models/Post';
import { Reply } from '../models/reply';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends RepositoryService {

  default = 5; // default
  count: number = this.default;
  page = 1;

  constructor(
    http: HttpClient
  ) {
    super(http);

    this.endpoint = 'posts';
    this.url += this.endpoint;
  }

  resetCount() {
    this.count = this.default;
    this.page = 1;
  }

  increaseCount() {
    this.count += 5;
    this.page++;
  }

  getAllPostsSummary(): Observable<PostSummary[]> {
    return this.http.get<any>(
      `${this.url}/all-summary?page=${this.page}`
    );
  }

}
