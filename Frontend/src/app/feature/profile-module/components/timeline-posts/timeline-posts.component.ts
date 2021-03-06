import { Component, OnInit } from '@angular/core';
import { PostSummary } from 'src/app/feature/app-newsfeed-module/models/postSummary';
import { PostService } from 'src/app/feature/app-newsfeed-module/services/post.service';

@Component({
  selector: 'timeline-posts',
  templateUrl: './timeline-posts.component.html',
  styleUrls: ['./timeline-posts.component.css']
})
export class TimelinePostsComponent implements OnInit {

  posts: PostSummary[] = [];

  constructor(
    private postService: PostService,
  ) { }
  

  ngOnInit(): void {
    this.fetchPosts();
  }

  fetchPosts() {
    // not passing username in parameter will force it to get username from account service!
    this.postService.getAllPostsSummaryByUser().subscribe((res: any) => {
      this.posts = res;
    });
  }

  loadMore() {
    this.postService.increaseCount();
    this.fetchPosts();
  }

  newPostShared = () => this.fetchPosts();

}
