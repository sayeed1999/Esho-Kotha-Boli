import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment_ } from 'src/app/models/comment';
import { Post } from 'src/app/models/Post';
import { QuestionBase } from 'src/app/models/question-base';
import { TextBox } from 'src/app/models/question-textbox';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import * as signalR from '@microsoft/signalr';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() post!: Post;
  questions!: QuestionBase<string>[];
  editMode = false;
  editedPost = '';
  subscription!: Subscription;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private sb: MatSnackBar
  ) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.questions = [
      new TextBox({
        key: 'body',
        label: 'Comment',
        placeholder: 'write a comment here'
      })
    ];
    this.fetchCommentsByPost();
    // Problem: it is getting disconnected!

    // const connection = new signalR.HubConnectionBuilder()
    // .configureLogging(signalR.LogLevel.Information)
    // .withUrl('https://localhost:44345/notify')
    // .build();

    // connection.start()
    //   .then(() => console.log('SignalR connected!'))
    //   .catch(err => alert(err));

    // connection.on("NewComment", (comment: Comment_) => {
    //   console.log(comment.postId + ' ' + this.post.id)
    //   if(comment.postId == this.post.id) {
    //     this.post.comments = [ comment, ...this.post.comments ];
    //     this.post = { ...this.post };
    //     console.log(this.post)
    //   }
    // });
  }

  fetchCommentsByPost() {
    this.subscription = this.commentService.dataChanged.subscribe(b => {
      this.commentService.getCommentsByPost(this.post.id).subscribe((res: Comment_[]) => {
        this.post.comments = res;
        // this.isLoading = false;
      }, (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open("Network Error. Please check your internet connection!", 'Okay');
        else this.sb.open(error.error ?? error.message, 'Okay');
        // this.isLoading = false;
      });
    });
  }

  received(e: { body: string }) {
    const comment = Comment_.newComment(e.body, this.post.id);
    this.commentService.add(comment).subscribe(
      res => {
        // this.reloadPage();
        this.postService.dataChanged.next(true);
        this.sb.open('Commenting done.', 'Okay');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) alert('Network error. Please check your internet connection!');
        else this.sb.open(error.error, 'Okay');
      }
    );
  }

  delete() {
    this.postService.delete(this.post.id).subscribe(
      res => {
        // this.reloadPage();
        this.postService.dataChanged.next(true);
        this.sb.open('Post deleted successfully', 'Good!');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'My Bad');
        else this.sb.open(error.error, 'Okay');
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

  saveEdited() {
    let tempPost = { ...this.post, body: this.editedPost }
    this.postService.update(this.post.id, tempPost).subscribe(
      (res: any) => {
        this.editMode = false;
        this.postService.dataChanged.next(true);
        this.sb.open('Post updated', 'Very Nice');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'So Bad');
        else this.sb.open(error.error, 'Okay');
      }
    );
  }

  // reloadPage() {
  //   window.location.reload();
  // }

}
