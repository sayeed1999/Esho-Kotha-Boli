import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/shared/models/question-base';
import { QuestionControlService } from '../../services/question-control.service';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() questions!: QuestionBase<string>[];
  @Input() buttonName: string = 'Save';
  form!: FormGroup;
  // payload = '';
  @Output() result = new EventEmitter<any>();

  constructor(
    private qcs: QuestionControlService
  ) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.result.emit(this.form.value);
    // this.payload = JSON.stringify(this.form.getRawValue());
  }

}
