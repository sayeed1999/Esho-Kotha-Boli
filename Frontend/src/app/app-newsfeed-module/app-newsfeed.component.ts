import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../utility/services/post.service';
import { Post } from '../models/Post';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostSummary } from '../models/postSummaryt';
import { ViewPost } from '../models/viewPost';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './app-newsfeed.component.html',
  styleUrls: ['./app-newsfeed.component.css']
})
export class AppNewsfeedComponent implements OnInit, OnDestroy {

  projectedPost: ViewPost | null = null;
  posts: PostSummary[] = [];
  // spinner
  isLoading = false;
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
    this.isLoading = true;
    this.postService.getAllPostsSummary().subscribe((res: PostSummary[]) => {
      this.posts = res;
      console.log(this.posts);
      this.isLoading = false;
    }, (error: HttpErrorResponse) => {
      console.log(error)
      if(error.status === 0) this.sb.open("Network Error. Please check your internet connection!", 'Okay');
      else this.sb.open(error.error ?? error.message, 'Okay');
      this.isLoading = false;
    });
  }

  getPostById(id: number) {
    // console.log(id); // debug purpose
    this.postService.getById(id).subscribe((res: ViewPost) => {
      this.projectedPost = res;
    }, (error: HttpErrorResponse) => {
      if(error.status === 0) this.sb.open("Network Error. Please check your internet connection!", 'Okay');
      else this.sb.open(error.error ?? error.message, 'Okay');
    });
  }

  loadMore() {
    this.postService.increaseCount();
    this.postService.dataChanged.next();
  }

}
