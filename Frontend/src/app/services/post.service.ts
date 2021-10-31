import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
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

  getAllPostsSummary(): Observable<Post[]> {
    return this.http.get<any>(
      `${this.url}/all-summary?page=${1}`
    );
  }

  getAllPosts(): Observable<Post[]> {
    // return of(posts);
    return this.http.get<any>(
      `${this.url}?page=${1}&number=${this.count}`
    );
  }
}

// dummy data
const posts: Post[] = [

  Post.newPost('Hi! I am Mhamud Hossen Sifat. I am a dummy post.', [
    Comment_.newComment('nice! I am a dummy comment', 0, [
      Reply.newReply('I am a dummy reply', 1)
    ]),
    Comment_.newComment('areh nicee! I am also a dummy comment', 0, [
      Reply.newReply('I am also a dummy data', 2),
      Reply.newReply('I am a dummy data too!', 2)
    ])
  ])

];