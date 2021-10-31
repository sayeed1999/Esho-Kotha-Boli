import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/models/Post';
import { QuestionBase } from 'src/app/models/question-base';
import { TextArea } from 'src/app/models/question-textarea';
import { PostService } from 'src/app/services/post.service';
import { ProjectAMessageComponent } from 'src/app/shared/project-a-message/project-a-message.component';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  questions!: QuestionBase<string>[];
  rerendering = false; // to render the child component
  messageDialogActive = false;

  constructor(
    private postService: PostService,
    private sb: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.questions = [
      new TextArea({
        key: 'body',
        value: '',
        label: 'Post',
        placeholder: 'Ex. It makes me feel...',
      })
    ];
  }

  received(e: { body: string }) {
    // removing spaces at both end
    e.body = e.body.trim();
    if(!e.body) {
      // empty string
      this.messageDialogActive = true;
    }
    const post = Post.newPost(e.body);
    this.postService.add(post).subscribe(res => {
      this.postService.resetCount(); // reset page count
      this.postService.dataChanged.next(true);
      this.rerender();
      this.sb.open('Post shared successfully', 'Hurrah!');
    }, (error: HttpErrorResponse) => {
      this.sb.open(error.error, 'Okay');
    });
  }

  rerender() {
    this.rerendering = true;
    setTimeout(() => {
      this.rerendering = false;
    }, 2);
  }

}
