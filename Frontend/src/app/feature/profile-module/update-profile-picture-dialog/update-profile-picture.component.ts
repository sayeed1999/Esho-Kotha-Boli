import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewProfilePicture } from 'src/app/core/models/viewProfilePicture';
import { ImageService } from 'src/app/core/services/image.service';
import { ProfilePictureService } from 'src/app/core/services/profile-picture.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.css']
})
export class UpdateProfilePictureDialogComponent implements OnInit {

  image!: File;
  base64!: string | null;

  constructor(
    public dialogRef: MatDialogRef<UpdateProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imgService: ImageService,
    private dpService: ProfilePictureService,
    private sl: SweetAlertService,
  ) {
    // if you had injected any data to the dialog, it will be available here..
    this.base64 = data.base64;
  }

  ngOnInit(): void {
  }

  changed(event: any) {
    console.log(event.target.value)
  }

  upload(): void {
    this.imgService.uploadProfilePicture(this.image).subscribe(
      (res: ViewProfilePicture) => {
        this.sl.textNIcon("Uploaded successfully!!", "success");

        this.dpService.dpUpdated.next();

        this.base64 = res.byteArray;
        if(!!this.base64) {
          this.base64 = 'data:image/jpg;base64,' + this.base64; // this.base64 is a String
        }
      }
    );
  }

}
