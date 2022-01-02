import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { PostSummary } from 'src/app/core/models/postSummaryt';
import { Comment_ } from '../models/comment';
import { Post } from '../models/Post';
import { Reply } from '../models/reply';
import { AccountService } from './account.service';
import { RepositoryService } from './repository.service';

@Injectable({
  providedIn: 'root'
})
export class PostService extends RepositoryService {

  private defaultCount = 5; // default
  count: number = this.defaultCount;
  page = 1;

  constructor(
    http: HttpClient,
    private acc: AccountService,
  ) {
    super(http);

    this.endpoint = 'posts';
    this.url += this.endpoint;
  }

  resetCount() {
    this.count = this.defaultCount;
    this.page = 1;
  }

  increaseCount() {
    this.count += 5;
    // this.page++; there is no page change. only each load more() will increase the post count by 5.
  }

  getAllPostsSummary(): Observable<PostSummary[]> {
    return this.http.get<any>(
      `${this.url}/all-summary?page=${this.page}&count=${this.count}`
    );
  }

  
  getAllPostsSummaryByUser(username?: string): Observable<PostSummary[]> {
    return this.http.get<any>(
      `${this.url}/all-summary/${username || this.acc.getUserName()}?page=${this.page}&count=${this.count}`
    );
  }

}
