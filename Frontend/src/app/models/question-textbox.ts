import { QuestionBase } from "./question-base";

export class TextBox extends QuestionBase<string> {
    controlType = 'textbox';
}