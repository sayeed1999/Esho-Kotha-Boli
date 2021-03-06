import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommentService } from 'src/app/feature/app-newsfeed-module/services/comment.service';
import { PostService } from 'src/app/feature/app-newsfeed-module/services/post.service';
import { ProfilePictureService } from 'src/app/feature/profile-module/services/profile-picture.service';
import { ReplyService } from 'src/app/feature/app-newsfeed-module/services/reply.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { Reply } from '../../../models/reply';
import { ViewReply } from '../../../models/viewReply';
import { QuestionBase } from 'src/app/shared/models/question-base';
import { ViewComment } from '../../../models/viewComment';
import { TextBox } from 'src/app/shared/models/question-textbox';

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
  base64: string|null = null; // dp

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private replyService: ReplyService,
    private sb: MatSnackBar,
    private sl: SweetAlertService,
    private dpService: ProfilePictureService,
  ) { }

  ngOnInit(): void {
    this.getProfilePictureByUsername(this.comment.userName);
    this.questions = [
      new TextBox({
        key: 'body',
        label: 'Reply',
        placeholder: ''
      })
    ];
  }

  getProfilePictureByUsername(username: string) {
    this.dpService.getProfilePictureByUsername(username).subscribe(
      base64 => {
        this.base64 = base64;
      }
    );
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
