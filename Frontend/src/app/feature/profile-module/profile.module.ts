import { NgModule } from '@angular/core';
import { ProfileComponent } from './components/profile/profile.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TimelinePostsComponent } from './components/timeline-posts/timeline-posts.component';
import { UpdateProfilePictureDialogComponent } from './components/update-profile-picture-dialog/update-profile-picture.component';

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
