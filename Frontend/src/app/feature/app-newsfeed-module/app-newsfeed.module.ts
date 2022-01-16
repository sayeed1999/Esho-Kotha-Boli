import { NgModule } from '@angular/core';
import { AppNewsfeedComponent } from './app-newsfeed.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './post/comment/comment.component';
import { ReplyComponent } from './post/comment/reply/reply.component';
import { NewsfeedRoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AppNewsfeedComponent,
    // CreatePostComponent,
    PostComponent,
    CommentComponent,
    ReplyComponent,
    // PostSummaryComponent,
  ],
  imports: [
    NewsfeedRoutingModule,
    SharedModule
  ]
})
export class AppNewsfeedModule { }
