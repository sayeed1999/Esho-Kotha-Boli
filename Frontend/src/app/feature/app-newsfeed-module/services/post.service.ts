import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../../account-module/services/account.service';
import { RepositoryService } from '../../../core/services/repository.service';
import { PostSummary } from '../models/postSummary';

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
