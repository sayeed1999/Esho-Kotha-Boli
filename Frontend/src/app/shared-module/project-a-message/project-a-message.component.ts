import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'project-a-message',
  templateUrl: './project-a-message.component.html',
  styleUrls: ['./project-a-message.component.css']
})
export class ProjectAMessageComponent implements OnInit {

  @Output() emitter = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  okay() {
    this.emitter.emit(false);
  }
}
