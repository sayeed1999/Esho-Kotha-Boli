import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reply } from 'src/app/models/reply';
import { PostService } from 'src/app/services/post.service';
import { ReplyService } from 'src/app/services/reply.service';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply!: Reply;
  editMode = false;
  editedReply = '';

  constructor(
    private postService: PostService,
    private replyService: ReplyService,
    private sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  delete() {
    this.replyService.delete(this.reply.id).subscribe(
      res => {
        this.postService.dataChanged.next(true);
        this.sb.open('Reply deleted successfully', 'Okay!');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'So Bad');
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
      this.editedReply = this.reply.body;  
    }
  }

  saveEdited() {
    this.reply.body = this.editedReply;
    this.replyService.update(this.reply.id, this.reply).subscribe(
      (res: any) => {
        this.editMode = false;
        this.postService.dataChanged.next(true);
        this.sb.open('Reply edited successfully', 'Nice!');
      },
      (error: HttpErrorResponse) => {
        if(error.status === 0) this.sb.open('Network error. Please check your internet connection!', 'So Bad');
        else this.sb.open(error.error, 'Okay');
      }
    );
  }

  // pageReload() {
  //   window.location.reload();
  // }

}
