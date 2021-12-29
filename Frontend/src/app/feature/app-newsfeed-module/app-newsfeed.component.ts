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
export class AppNewsfeedComponent implements OnInit, OnDestroy {

  projectedPost: ViewPost | null = null;
  posts: PostSummary[] = [];
  subscription!: Subscription;

  constructor(
    private postService: PostService,
    private sb: MatSnackBar,
  ) { }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.fetchPosts();
    this.subscription = this.postService.dataChanged.subscribe((bool: boolean) => {
      this.fetchPosts();
      this.getPostById(this.projectedPost?.id || 0);
    });
  }

  fetchPosts() {
    this.postService.getAllPostsSummary().subscribe((res: PostSummary[]) => {
      this.posts = res;
    }, (error: HttpErrorResponse) => {
      this.sb.open(error.error, 'Okay');
    });
  }

  getPostById(id: number) {
    // console.log(id); // debug purpose
    this.postService.getById(id).subscribe((res: ViewPost) => {
      this.projectedPost = res;
    }, (error: HttpErrorResponse) => {
      this.sb.open(error.error, 'Okay');
    });
  }

  loadMore() {
    this.postService.increaseCount();
    this.postService.dataChanged.next();
  }

}
