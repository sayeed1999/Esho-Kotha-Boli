import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Comment_ } from 'src/app/core/models/comment';
import { QuestionBase } from 'src/app/core/models/question-base';
import { TextBox } from 'src/app/core/models/question-textbox';
import { Reply } from 'src/app/core/models/reply';
import { ViewComment } from 'src/app/core/models/viewComment';
import { ViewReply } from 'src/app/core/models/viewReply';
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
  @Output() deleteEvent = new EventEmitter<number>(); // returns the id of the deleted one
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

  // when a reply is given on a comment
  received(e: { body: string }) {
    const reply = Reply.newReply(e.body, this.comment.id);
    this.replyService.add(reply).subscribe(
      (res: ViewReply) => {
        this.comment.replies.push(res);
        this.rerender();
        this.sb.open('Reply given', 'Okay');
      }
    );
  }

  // when a comment is deleted
  delete() {
    this.commentService.delete(this.comment.id).subscribe(
      res => {
        this.deleteEvent.emit(this.comment.id);
        this.sb.open('Comment deleted', 'Thanks');
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

  // when a comment is edited
  saveEdited() {
    this.comment.body = this.editedComment;
    this.commentService.update(this.comment.id, this.comment).subscribe(
      (res: any) => {
        this.comment.body = this.editedComment;
        this.editMode = false;
        this.sb.open('Comment updated', 'Okay');
      }
    );
  }

  rerender() {
    this.renderingReply = true;
    setTimeout(() => this.renderingReply = false, 20);
  }

  replyDeleted(id: number) {
    this.comment.replies = this.comment.replies.filter(x => x.id !== id);
  }

}
