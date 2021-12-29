import { QuestionBase } from "./question-base";

export class TextArea extends QuestionBase<string> {
    controlType = 'textarea';
}