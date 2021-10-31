import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNewsfeedComponent } from './app-newsfeed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './post/comment/comment.component';
import { ReplyComponent } from './post/comment/reply/reply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AppNewsfeedComponent,
    CreatePostComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    AppNewsfeedComponent,
  ]
})
export class AppNewsfeedModule { }
