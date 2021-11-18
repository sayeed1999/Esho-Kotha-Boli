import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormQuestionComponent } from './dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../material-module/angular-material.module';
import { ProjectAMessageComponent } from './project-a-message/project-a-message.component';
import { RaiseButtonDirective } from './directives/raise-button.directive';
import { ProjectAContentComponent } from './project-a-content/project-a-content.component';
import { NewlinePipe } from './custom-pipes/newline.pipe';



@NgModule({
  declarations: [
    DynamicFormQuestionComponent,
    DynamicFormComponent,
    ProjectAMessageComponent,
    RaiseButtonDirective,
    ProjectAContentComponent,
    NewlinePipe,
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    DynamicFormComponent,
    ProjectAMessageComponent,
    ProjectAContentComponent,
    NewlinePipe,
  ]
})
export class SharedModule { }
