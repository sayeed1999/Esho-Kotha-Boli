import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment_ } from 'src/app/models/comment';
import { QuestionBase } from 'src/app/models/question-base';
import { TextBox } from 'src/app/models/question-textbox';
import { CommentService } from 'src/app/utility/services/comment.service';
import { PostService } from 'src/app/utility/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewPost } from 'src/app/models/viewPost';
import { SweetAlertService } from 'src/app/utility/services/sweet-alert.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: ViewPost;
  questions!: QuestionBase<string>[];
  editMode = false;
  editedPost = '';
  renderingComment = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private sb: MatSnackBar,
    private sl: SweetAlertService,
  ) { }

  ngOnInit(): void {
    this.questions = [
      new TextBox({
        key: 'body',
        label: 'Comment',
        placeholder: 'write a comment here'
      })
    ];
  }

  received(e: { body: string }) {
    const comment = Comment_.newComment(e.body, this.post.id);
    this.commentService.add(comment).subscribe(
      res => {
        this.rerender();
        this.postService.dataChanged.next(true);
        this.sb.open('Commenting done.', 'Okay');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) alert('Network error. Please check your internet connection!');
        // else this.sb.open(error.error, 'Okay');
        else this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  delete() {
    this.postService.delete(this.post.id).subscribe(
      res => {
        this.postService.dataChanged.next(true);
        this.sb.open('Post deleted successfully', 'Good!');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'My Bad');
        // else this.sb.open(error.error, 'Okay');
        else this.sl.textNIcon(error.error, 'error');
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
        // else this.sb.open(error.error, 'Okay');
        else this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  rerender() {
    this.renderingComment = true;
    setTimeout(() => this.renderingComment = false, 20);
  }

}
