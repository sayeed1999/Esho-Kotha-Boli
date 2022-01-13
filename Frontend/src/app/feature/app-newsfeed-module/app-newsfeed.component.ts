import { Component, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { PostSummary } from '../../core/models/postSummary';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from 'src/app/core/services/signal-r.service';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './app-newsfeed.component.html',
  styleUrls: ['./app-newsfeed.component.css']
})
export class AppNewsfeedComponent implements OnInit {

  posts: PostSummary[] = [];

  constructor(
    private postService: PostService,
    public signalRSerice: SignalRService,
  ) { }
  
  ngOnInit(): void {
    this.initializeSignalR();
    this.fetchPosts();

    this.signalRSerice.newPostSummaryReceived.subscribe(
      res => {
        this.posts.unshift(res);
      }
    );
  }
  
  initializeSignalR() {
    this.signalRSerice.startConnection();
    this.signalRSerice.dataListener();
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

  newPostShared = (postId: number) => {
    this.fetchPosts();
    this.signalRSerice.invokeMethod(postId);
  }

}
