import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Post } from 'src/app/core/models/Post';
import { QuestionBase } from 'src/app/core/models/question-base';
import { TextArea } from 'src/app/core/models/question-textarea';
import { PostService } from 'src/app/core/services/post.service';
import { ProjectAMessageComponent } from 'src/app/shared/components/project-a-message/project-a-message.component';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output() newPostCreated = new EventEmitter<void>();
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
      this.newPostCreated.emit();
      this.postService.resetCount(); // reset page count
      this.rerender();
      this.sb.open('Post shared successfully', 'Hurrah!');
    });
  }

  rerender() {
    this.rerendering = true;
    setTimeout(() => {
      this.rerendering = false;
    }, 2);
  }

}
