import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewUser } from 'src/app/core/models/viewUser';
import { ProfilePictureService } from 'src/app/feature/profile-module/services/profile-picture.service';
import { UpdateProfilePictureDialogComponent } from '../update-profile-picture-dialog/update-profile-picture.component';

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
      (base64: string) => {
        this.base64 = base64;
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
