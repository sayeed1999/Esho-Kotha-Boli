import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppChatComponent } from './app-chat.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AppChatComponent
  ],
  imports: [
    // here will be only one module that is the routing module for this module
    SharedModule
  ]
})
export class AppChatModule { }
