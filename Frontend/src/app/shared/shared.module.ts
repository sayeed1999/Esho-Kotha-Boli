import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material-module/angular-material.module';
import { UtilityModule } from '../utility/utility.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { ProjectAContentComponent } from './components/project-a-content/project-a-content.component';
import { ProjectAMessageComponent } from './components/project-a-message/project-a-message.component';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ProjectAContentComponent,
    ProjectAMessageComponent,
  ],
  imports: [ // imports the modules first to export under this module in an organized manner!
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // my written ones
    AngularMaterialModule,
    UtilityModule,
  ],
  exports: [
    // basically export all components and modules because these are going to be shared!
    
    // all modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    UtilityModule,
    
    // all components
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ProjectAContentComponent,
    ProjectAMessageComponent,
  ]
})
export class SharedModule { }
