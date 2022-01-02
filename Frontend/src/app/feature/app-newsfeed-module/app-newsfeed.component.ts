import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/models/Post';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostSummary } from '../../core/models/postSummaryt';
import { ViewPost } from '../../core/models/viewPost';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './app-newsfeed.component.html',
  styleUrls: ['./app-newsfeed.component.css']
})
export class AppNewsfeedComponent implements OnInit {

  posts: PostSummary[] = [];

  constructor(
    private postService: PostService,
  ) { }
  

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    this.postService.getAllPostsSummary().subscribe((res: any) => {
      this.posts = res;
    });
  }

  loadMore() {
    this.postService.increaseCount();
    this.fetchPosts();
  }

  newPostShared = () => this.fetchPosts();

}
