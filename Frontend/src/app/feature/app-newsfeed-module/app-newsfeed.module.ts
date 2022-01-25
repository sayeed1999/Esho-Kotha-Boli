import { NgModule } from '@angular/core';
import { AppNewsfeedComponent } from './components/app-newsfeed/app-newsfeed.component';
import { NewsfeedRoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/post/comment/comment.component';
import { ReplyComponent } from './components/post/comment/reply/reply.component';



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
