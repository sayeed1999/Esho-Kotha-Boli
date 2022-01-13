import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostService } from '../../core/services/post.service';
import { PostSummary } from '../../core/models/postSummary';
import { HttpClient } from '@angular/common/http';
import { SignalRService } from 'src/app/core/services/signalr.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-newsfeed',
  templateUrl: './app-newsfeed.component.html',
  styleUrls: ['./app-newsfeed.component.css']
})
export class AppNewsfeedComponent implements OnInit, OnDestroy {

  posts: PostSummary[] = [];
  subscriptions: Subscription[] = [];

  constructor(
    private postService: PostService,
    public signalRService: SignalRService,
  ) { }
  
  ngOnInit(): void {
    this.initializeSignalR();
    this.fetchPosts();

    this.subscriptions.push(
      this.signalRService.newPostSummaryReceived.subscribe(
        (res: PostSummary) => {
          this.posts.unshift(res);
        })
    );

    this.subscriptions.push(
      this.signalRService.aPostHasBeenDeleted.subscribe(
        (postId: number) => {
          this.posts = this.posts.filter(x => x.id !== postId); // Id property itself is the main post's PK i.e. Id
        })
    );

  }
  
  initializeSignalR() {
    this.signalRService.startConnection();
    this.signalRService.dataListener("newPostReceived",
      this.signalRService.newPostSummaryReceived
    );
    this.signalRService.dataListener("postHasBeenDeleted",
      this.signalRService.aPostHasBeenDeleted
    );
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
    this.signalRService.invokeMethod("NewPostCreated", postId);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(x => {
      x.unsubscribe();
    });
    // terminate the hub that was connected to the server earing newsfeed changes!
    // and the hub will be restored on visiting the Newsfeed component
    this.signalRService.terminateHubConnection();
  }

}
