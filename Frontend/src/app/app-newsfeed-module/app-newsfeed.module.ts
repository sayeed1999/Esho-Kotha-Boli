import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNewsfeedComponent } from './app-newsfeed.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { AngularMaterialModule } from '../material-module/angular-material.module';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './post/comment/comment.component';
import { ReplyComponent } from './post/comment/reply/reply.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared-module/shared.module';
import { NewsfeedRoutingModule } from './routing.module';
import { PostSummaryComponent } from './post-summary/post-summary.component';



@NgModule({
  declarations: [
    AppNewsfeedComponent,
    CreatePostComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent,
    PostSummaryComponent,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    SharedModule,
    NewsfeedRoutingModule
  ],
  exports: [
    AppNewsfeedComponent,
  ]
})
export class AppNewsfeedModule { }
