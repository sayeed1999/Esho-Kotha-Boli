import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewProfilePicture } from 'src/app/core/models/viewProfilePicture';
import { ImageService } from 'src/app/core/services/image.service';
import { ProfilePictureService } from 'src/app/core/services/profile-picture.service';
import { ViewUser } from '../../core/models/viewUser';
import { UpdateProfilePictureDialogComponent } from './update-profile-picture-dialog/update-profile-picture.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy { // bug present! component not loading on UI :(
  viewUser!: ViewUser;
  base64: string | null = null;
  subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private dpService: ProfilePictureService,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      // console.log('Checking route resolver data...', data);
      this.viewUser = data.routeResolver;
    });
    this.fetchProfilePicture();
    this.subscription = this.dpService.dpUpdated.subscribe(res => {
      this.fetchProfilePicture();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fetchProfilePicture(): void {
    this.dpService.getProfilePictureByUsername(this.viewUser.userName).subscribe(
      (res: ViewProfilePicture) => {
        this.base64 = res.byteArray;
        if(!!this.base64) {
          this.base64 = 'data:image/jpg;base64,' + this.base64; // this.base64 is a String
        }
        else {
          this.base64 = 'assets/user.jpg';
        }    
      }
    );
  }

  editProfilePictureClicked() {
    const dialogRef = this.dialog.open(UpdateProfilePictureDialogComponent, {
      maxWidth: '376px',
      minWidth: '296px',
      height: '76vh',
      data: { base64: this.base64 } // pass any data here you want to inject
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('dialog has been closed for the update profile picture component.', result);
    });
  }
}
