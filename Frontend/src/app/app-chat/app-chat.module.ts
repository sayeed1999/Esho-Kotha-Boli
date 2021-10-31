import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppChatComponent } from './app-chat.component';



@NgModule({
  declarations: [
    AppChatComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AppChatComponent
  ]
})
export class AppChatModule { }
