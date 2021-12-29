import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from 'src/app/core/models/question-base';

@Component({
  selector: 'dynamic-form-question',
  templateUrl: './dynamic-form-question.component.html',
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  @Input() question!: QuestionBase<string>;
  @Input() form!: FormGroup;

  constructor() { }

  get isValid() {
    return this.form.controls[this.question.key].valid;
  }

  get isTouched() {
    return this.form.controls[this.question.key].touched;
  }

  get isDirty() {
    return this.form.controls[this.question.key].dirty;
  }

}
