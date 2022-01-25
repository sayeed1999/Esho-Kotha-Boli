import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../../feature/account-module/services/account.service';
import { ViewPost } from 'src/app/feature/app-newsfeed-module/models/viewPost';
import { Message } from '../models/message';
import { PostSummary } from 'src/app/feature/app-newsfeed-module/models/postSummary';
import { ViewUser } from '../models/viewUser';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  public currentUser!: ViewUser;
  public connectionIdsOfMessageReceiver = null;
  public newPostSummaryReceived = new Subject<PostSummary>();
  public aPostHasBeenDeleted = new Subject<number>();
  public aPostHasBeenUpdated = new Subject<ViewPost>();
  public messageReceived = new Subject<Message>();

  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
  ) {}

  public startConnection = (endpointUrl: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/" + endpointUrl)
      .withAutomaticReconnect()
      .build();
    
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .then(() => {
        this.accountService.getCurrentUser.subscribe(res => {
          this.currentUser = res;
          this.hubConnection.invoke("CustomOnConnected", this.currentUser.id);
        });
      })
      .catch(err => console.log('Error while starting connection'));
    
  }

  // connectionIds of the user to chat with...
  public getConnectionIdsOfUser = (userId: string) => {
    return this.hubConnection.invoke('GetConnectionIds', userId)
    .then(data => {
      this.connectionIdsOfMessageReceiver = data;
    });
  }

  public dataListener = (method: string, callback: any) => {
    this.hubConnection.on(method, (data: any, message: string, title: string) => {
      this.toastr.info(message, title);
      callback.next(data); // the callback is actually here a subject which is emitting via next() method for its receivers..
    });
  }

  public invokeMethod = (method: string, data: any) => {
    if(!this.connectionIdsOfMessageReceiver) this.hubConnection.invoke(method, data);
    else this.hubConnection.invoke(method, data, this.connectionIdsOfMessageReceiver);
  }

  public terminateHubConnection() {
    this.hubConnection.stop();
  }

}
