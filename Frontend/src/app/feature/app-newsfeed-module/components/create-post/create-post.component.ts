import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionBase } from 'src/app/shared/models/question-base';
import { PostService } from 'src/app/feature/app-newsfeed-module/services/post.service';
import { TextArea } from 'src/app/shared/models/question-textarea';
import { Post } from '../../models/Post';

@Component({
  selector: 'create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @Output() newPostCreated = new EventEmitter<number>();
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
      return;
    }
    const post = Post.newPost(e.body);
    this.postService.add(post).subscribe((res: Post) => {
      this.newPostCreated.emit(res.id);
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
