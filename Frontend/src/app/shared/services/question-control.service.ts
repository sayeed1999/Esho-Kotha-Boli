import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../models/question-base';

@Injectable({
  providedIn: 'root'
})
export class QuestionControlService {

  constructor(private fb: FormBuilder) { }

  toFormGroup(questions: QuestionBase<string>[]): FormGroup {
    const group: any = {};

    questions.forEach(question => {
      group[question.key] = [
          question.value || '', 
          question.validators, 
          question.asyncValidators
      ]
    });

    return this.fb.group(group);
  }
}
