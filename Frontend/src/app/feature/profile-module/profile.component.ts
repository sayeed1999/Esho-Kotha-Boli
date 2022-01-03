import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ImageService } from 'src/app/core/services/image.service';
import { ViewUser } from '../../core/models/viewUser';
import { UpdateProfilePictureDialogComponent } from './update-profile-picture-dialog/update-profile-picture.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { // bug present! component not loading on UI :(
  viewUser!: ViewUser;

  constructor(
    private activatedRoute: ActivatedRoute,
    private imgService: ImageService,
    public dialog: MatDialog,
  ) {
    console.log("profile component")
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      console.log('Checking route resolver data...', data);
      this.viewUser = data.routeResolver;
    })
  }

  editProfilePictureClicked() {
    const dialogRef = this.dialog.open(UpdateProfilePictureDialogComponent, {
      maxWidth: '600px',
      minWidth: '400px',
      height: '80vh',
      data: {} // pass any data here you want to inject
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog has been closed for the update profile picture component.', result);
    });
  }
}
