import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { PeopleBoxComponent } from './components/people-box/people-box.component';
import { RoutingModule } from './routing.module';



@NgModule({
  declarations: [
    MessengerComponent,
    PeopleBoxComponent,
    ChatBoxComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule
  ]
})
export class AppChatModule { }
