import { Component, Input, OnInit } from '@angular/core';
import { PostSummary } from 'src/app/core/models/postSummary';
import { ProfilePictureService } from 'src/app/core/services/profile-picture.service';

@Component({
  selector: 'post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.css']
})
export class PostSummaryComponent implements OnInit {
  @Input('post') postSummary!: PostSummary;
  base64: string|null = null; // profile picture

  constructor(private dpService: ProfilePictureService) { }

  ngOnInit(): void {
    this.getProfilePictureByUsername(this.postSummary.userName);
  }

  getProfilePictureByUsername(username: string) {
    this.dpService.getProfilePictureByUsername(username).subscribe(
      base64 => {
        this.base64 = base64;
      }
    );
  }

}
