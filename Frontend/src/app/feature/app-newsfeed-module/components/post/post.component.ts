import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommentService } from 'src/app/feature/app-newsfeed-module/services/comment.service';
import { PostService } from 'src/app/feature/app-newsfeed-module/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilePictureService } from 'src/app/feature/profile-module/services/profile-picture.service';
import { SignalRService } from 'src/app/core/services/signalr.service';
import { Subscription } from 'rxjs';
import { QuestionBase } from 'src/app/shared/models/question-base';
import { ViewPost } from '../../models/viewPost';
import { Comment_ } from '../../models/comment';
import { ViewComment } from '../../models/viewComment';
import { TextBox } from 'src/app/shared/models/question-textbox';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  post!: ViewPost;
  postId!: number;
  questions!: QuestionBase<string>[];
  editMode = false;
  editedPost = '';
  renderingComment = false;
  base64: string | null = null;  // profile picture
  subscription!: Subscription;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private sb: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private dpService: ProfilePictureService,
    private signalrService: SignalRService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.postId = +data.id; // e.g. { id: '107' }
    })

    this.route.data.subscribe((data: any) => {
      this.post = data.routeResolver;
      this.getProfilePictureByUsername(this.post.userName);
    })

    this.questions = [
      new TextBox({
        key: 'body',
        label: 'Comment',
        placeholder: 'write a comment here'
      })
    ];

    this.signalrService.startConnection("newsfeed");
    this.signalrService.dataListener("PostHasBeenUpdated", this.signalrService.aPostHasBeenUpdated);
    
    this.subscription = this.signalrService.aPostHasBeenUpdated.subscribe(res => {
      this.post = res;
    });
  }

  getProfilePictureByUsername(username: string) {
    this.dpService.getProfilePictureByUsername(username).subscribe(
      base64 => {
        this.base64 = base64;
      }
    );
  }

  // when a new comment is added
  received(e: { body: string }) {
    const comment = Comment_.newComment(e.body, this.post.id);
    this.commentService.add(comment).subscribe(
      (res: ViewComment) => {
        this.rerender();
        this.post.comments.push(res);
        this.sb.open('Commenting done.', 'Okay');
      }
    );
  }

  // when the post is deleted
  delete() {
    this.postService.delete(this.post.id).subscribe(
      res => {
        // the method on the server is invoked so that it informs all other users that a post has been deleted.
        this.signalrService.invokeMethod("PostHasBeenDeleted", this.post.id);

        this.router.navigate(['../../'], { relativeTo: this.route });
        this.sb.open('Post deleted successfully', 'Good!');
      }
    );
  }

  edit() {
    if(this.editMode)
    {
      this.editMode = false;
    }
    else
    {
      this.editMode = true;
      this.editedPost = this.post.body;  
    }
  }

  // when the post is edited
  saveEdited() {
    let tempPost = { ...this.post, body: this.editedPost }
    this.postService.update(this.post.id, tempPost).subscribe(
      (res: any) => {
        this.post.body = this.editedPost; // no need to call the api
        this.signalrService.invokeMethod("postHasBeenUpdated", this.post);
        this.editMode = false;
        this.sb.open('Post updated', 'Okay');
      }
    );
  }

  rerender() {
    this.renderingComment = true;
    setTimeout(() => this.renderingComment = false, 20);
  }

  commentDeleted(id: number) {
    this.post.comments = this.post.comments.filter(x => x.id !== id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.signalrService.terminateHubConnection();
  }

}
