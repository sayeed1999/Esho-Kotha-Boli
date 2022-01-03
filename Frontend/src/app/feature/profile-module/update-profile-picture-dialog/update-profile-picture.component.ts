import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageService } from 'src/app/core/services/image.service';
import { SweetAlertService } from 'src/app/core/services/sweet-alert.service';

@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.css']
})
export class UpdateProfilePictureDialogComponent implements OnInit {

  image!: File;

  constructor(
    public dialogRef: MatDialogRef<UpdateProfilePictureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imgService: ImageService,
    private sl: SweetAlertService,
  ) {
    // if you had injected any data to the dialog, it will be available here in 'data' variable..
  }

  ngOnInit(): void {
  }

  changed(event: any) {
    console.log(event.target.value)
  }

  upload(): void {
    this.imgService.uploadProfilePicture(this.image).subscribe(
      res => {
        this.sl.textNIcon("Uploaded successfully!!", "success");
      }
    );
  }

}
