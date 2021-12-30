import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Comment_ } from 'src/app/core/models/comment';
import { QuestionBase } from 'src/app/core/models/question-base';
import { TextBox } from 'src/app/core/models/question-textbox';
import { CommentService } from 'src/app/core/services/comment.service';
import { PostService } from 'src/app/core/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewPost } from 'src/app/core/models/viewPost';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewComment } from 'src/app/core/models/viewComment';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post!: ViewPost;
  postId!: number;
  questions!: QuestionBase<string>[];
  editMode = false;
  editedPost = '';
  renderingComment = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private sb: MatSnackBar,
    private sl: SweetAlertService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.postId = +data.id; // e.g. { id: '107' }
    })

    this.route.data.subscribe((data: any) => {
      this.post = data.routeResolver;
    })

    this.questions = [
      new TextBox({
        key: 'body',
        label: 'Comment',
        placeholder: 'write a comment here'
      })
    ];
  }

  // when a new comment is added
  received(e: { body: string }) {
    const comment = Comment_.newComment(e.body, this.post.id);
    this.commentService.add(comment).subscribe(
      (res: ViewComment) => {
        this.rerender();
        this.post.comments.push(res);
        this.sb.open('Commenting done.', 'Okay');
      },
      (error: HttpErrorResponse) => {
        this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  // when the post is deleted
  delete() {
    this.postService.delete(this.post.id).subscribe(
      res => {
        this.router.navigate(['../../'], { relativeTo: this.route });
        this.sb.open('Post deleted successfully', 'Good!');
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
      this.editedPost = this.post.body;  
    }
  }

  // when the post is edited
  saveEdited() {
    let tempPost = { ...this.post, body: this.editedPost }
    this.postService.update(this.post.id, tempPost).subscribe(
      (res: any) => {
        this.post.body = this.editedPost; // no need to call the api since it is a success call!
        this.editMode = false;
        this.sb.open('Post updated', 'Okay');
      },
      (error: HttpErrorResponse) => {
        this.sl.textNIcon(error.error, 'error');
      }
    );
  }

  rerender() {
    this.renderingComment = true;
    setTimeout(() => this.renderingComment = false, 20);
  }

  commentDeleted(id: number) {
    this.post.comments = this.post.comments.filter(x => x.id !== id);
  }

}
