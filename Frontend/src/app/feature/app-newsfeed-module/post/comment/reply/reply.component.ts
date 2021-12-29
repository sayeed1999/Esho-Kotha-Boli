import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reply } from 'src/app/core/models/reply';
import { ViewReply } from 'src/app/core/models/viewReply';
import { PostService } from 'src/app/core/services/post.service';
import { ReplyService } from 'src/app/core/services/reply.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply!: ViewReply;
  editMode = false;
  editedReply = '';

  constructor(
    private postService: PostService,
    private replyService: ReplyService,
    private sb: MatSnackBar,
    private sl: SweetAlertService,
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
        this.sl.textNIcon(error.error, 'error');
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
        this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  // pageReload() {
  //   window.location.reload();
  // }

}
