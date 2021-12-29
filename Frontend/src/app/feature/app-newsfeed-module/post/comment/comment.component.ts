import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment_ } from 'src/app/core/models/comment';
import { QuestionBase } from 'src/app/core/models/question-base';
import { TextBox } from 'src/app/core/models/question-textbox';
import { Reply } from 'src/app/core/models/reply';
import { ViewComment } from 'src/app/core/models/viewComment';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment!: ViewComment;
  questions!: QuestionBase<string>[];
  editMode = false;
  editedComment = '';
  renderingReply = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private replyService: ReplyService,
    private sb: MatSnackBar,
    private sl: SweetAlertService,
  ) { }

  ngOnInit(): void {
    this.questions = [
      new TextBox({
        key: 'body',
        label: 'Reply',
        placeholder: ''
      })
    ];
  }

  received(e: { body: string }) {
    const reply = Reply.newReply(e.body, this.comment.id);
    this.replyService.add(reply).subscribe(
      res => {
        this.postService.dataChanged.next(true);
        this.sb.open('Reply given', 'Okay');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'So Bad');
        // else this.sb.open(error.error, 'Okay');
        else this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  delete() {
    this.commentService.delete(this.comment.id).subscribe(
      res => {
        this.rerender();
        this.postService.dataChanged.next(true);
        this.sb.open('Comment deleted', 'Thanks');
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
      this.editedComment = this.comment.body;  
    }
  }

  saveEdited() {
    this.comment.body = this.editedComment;
    this.commentService.update(this.comment.id, this.comment).subscribe(
      (res: any) => {
        this.editMode = false;
        this.postService.dataChanged.next();
        this.sb.open('Comment updated', 'Okay');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'So Bad');
        // else this.sb.open(error.error, 'Okay');
        else this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  rerender() {
    this.renderingReply = true;
    setTimeout(() => this.renderingReply = false, 20);
  }

}
