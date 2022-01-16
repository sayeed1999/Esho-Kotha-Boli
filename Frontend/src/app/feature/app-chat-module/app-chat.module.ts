import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
  ],
  imports: [
    // here will be only one module that is the routing module for this module
    SharedModule
  ]
})
export class AppChatModule { }
