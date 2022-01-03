import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './material-module/angular-material.module';
import { UtilityModule } from '../utility/utility.module';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form/dynamic-form-question/dynamic-form-question.component';
import { ProjectAContentComponent } from './components/project-a-content/project-a-content.component';
import { ProjectAMessageComponent } from './components/project-a-message/project-a-message.component';
import { PostSummaryComponent } from '../feature/app-newsfeed-module/post-summary/post-summary.component';
import { CreatePostComponent } from '../feature/app-newsfeed-module/create-post/create-post.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ProjectAContentComponent,
    ProjectAMessageComponent,
    // components from profile module starts here
    CreatePostComponent,
    PostSummaryComponent,
    // components from profile module ends here
  ],
  imports: [ // imports the modules first to export under this module in an organized manner!
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    // my written ones
    AngularMaterialModule,
    UtilityModule,

    // installed ones
  ],
  exports: [
    // basically export all components and modules because these are going to be shared!
    
    // all modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    UtilityModule,
    
    // all components
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    ProjectAContentComponent,
    ProjectAMessageComponent,
    CreatePostComponent,
    PostSummaryComponent,
  ]
})
export class SharedModule { }
