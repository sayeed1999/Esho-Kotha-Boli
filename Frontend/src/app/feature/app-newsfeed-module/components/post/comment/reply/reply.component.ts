import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfilePictureService } from 'src/app/feature/profile-module/services/profile-picture.service';
import { ReplyService } from 'src/app/feature/app-newsfeed-module/services/reply.service';
import { ViewReply } from 'src/app/feature/app-newsfeed-module/models/viewReply';

@Component({
  selector: 'reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  @Input() reply!: ViewReply;
  @Output() deleteEvent = new EventEmitter<number>(); // emits deleted reply Id;
  editMode = false;
  editedReply = '';
  base64!: string | null; // profile pic.

  constructor(
    private replyService: ReplyService,
    private sb: MatSnackBar,
    private dpService: ProfilePictureService,
  ) { }

  ngOnInit(): void {
    this.getProfilePictureByUsername(this.reply.userName);
  }

  getProfilePictureByUsername(username: string) {
    this.dpService.getProfilePictureByUsername(username).subscribe(
      base64 => {
        this.base64 = base64;
      }
    );
  }

  // when a reply is deleted
  delete() {
    this.replyService.delete(this.reply.id).subscribe(
      res => {
        this.deleteEvent.emit(this.reply.id);
        this.sb.open('Reply deleted successfully', 'Okay!');
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

  // when a reply is edited
  saveEdited() {
    this.reply.body = this.editedReply;
    this.replyService.update(this.reply.id, this.reply).subscribe(
      (res: any) => {
        this.reply.body = this.editedReply;
        this.editMode = false;
        this.sb.open('Reply edited successfully', 'Nice!');
      }
    );
  }

  // pageReload() {
  //   window.location.reload();
  // }

}
