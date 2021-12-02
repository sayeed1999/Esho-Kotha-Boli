import { Component, Input, OnInit } from '@angular/core';
import { PostSummary } from 'src/app/models/postSummaryt';

@Component({
  selector: 'post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.css']
})
export class PostSummaryComponent implements OnInit {

  @Input('post') postSummary!: PostSummary;

  constructor() { }

  ngOnInit(): void {
  }

}
