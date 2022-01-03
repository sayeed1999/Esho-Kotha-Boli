import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimelinePostsComponent } from './timeline-posts/timeline-posts.component';
import { UpdateProfilePictureDialogComponent } from './update-profile-picture-dialog/update-profile-picture.component';

@NgModule({
  declarations: [
    ProfileComponent,
    TimelinePostsComponent,
    UpdateProfilePictureDialogComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
