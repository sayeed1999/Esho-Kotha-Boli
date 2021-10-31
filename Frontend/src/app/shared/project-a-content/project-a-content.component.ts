import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'project-a-content',
  templateUrl: './project-a-content.component.html',
  styleUrls: ['./project-a-content.component.css']
})
export class ProjectAContentComponent implements OnInit {

  @Output() emitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  okay() {
    this.emitter.emit(false);
  }
}
