import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewlinePipe } from './custom-pipes/newline.pipe';
import { FocusItemDirective } from './directives/focus-item.directive';
import { RaiseButtonDirective } from './directives/raise-button.directive';
import { AppHoverTextDirective } from './directives/hover-text.directive';



@NgModule({
  declarations: [
    // pipes
    NewlinePipe,

    // directives
    FocusItemDirective,
    RaiseButtonDirective,
    AppHoverTextDirective,

  ],
  imports: [
    CommonModule
  ],
  exports: [
    // pipes
    NewlinePipe,

    // directives
    FocusItemDirective,
    RaiseButtonDirective,    
    AppHoverTextDirective,
  ]
})
export class UtilityModule { }
