import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/core/models/message';
import { QuestionBase } from 'src/app/core/models/question-base';
import { TextArea } from 'src/app/core/models/question-textarea';
import { ViewUser } from 'src/app/core/models/viewUser';
import { AccountService } from 'src/app/core/services/account.service';
import { SignalRService } from 'src/app/core/services/signalr.service';
import { ChatBoxService } from '../../services/chat-box/chat-box.service';

@Component({
  selector: 'chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.css']
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  chatWith: any = 'null'; // userid;
  subscription!: Subscription;
  user!: ViewUser;
  messages: Message[] = [];
  questions!: QuestionBase<string>[];
  rendering = false;
  
  constructor(
    private chatBoxService: ChatBoxService,
    private accountService: AccountService,
    private signalrService: SignalRService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.chatBoxService.chatWith.subscribe((user: any) => {
      if(user) {
        this.chatWith = user;
        this.getMessages();
      }
    });

    this.accountService.getCurrentUser.subscribe(user => {
      this.user = user;
    });

    this.initializeForm();

    this.signalrService.startConnection("messaging");
    this.signalrService.dataListener("messageSent", this.signalrService.messageReceived);
  }

  initializeForm() {
    this.questions = [
      new TextArea({
        key: 'body',
        label: 'message',
        placeholder: 'type your message here...',
        value: ''
      })
    ];
  }

  received(event: any) { //{ body: 'message body' }
    const message = new Message(0, event.body, this.user.id, this.chatWith.id, new Date());
    this.chatBoxService.sendMessageAsync(message).subscribe(
      (res: Message) => {
        this.signalrService.invokeMethod("messageSent", res, res.to);
        this.messages.unshift(res);
        this.rerender();
      },
      error => {
      }
    );
  }

  rerender() {
    this.rendering = true;
    setTimeout(() => {
      this.rendering = false;
    }, 2);
  }

  getMessages() {
    this.chatBoxService.getMessagesAsync(this.user.id, this.chatWith.id).subscribe(messages => {
      this.messages = messages.reverse();
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
      this.signalrService.terminateHubConnection();
  }

}
