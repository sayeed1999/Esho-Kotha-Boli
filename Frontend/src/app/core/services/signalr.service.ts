import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { PostSummary } from '../models/postSummary';

import { ToastrService } from 'ngx-toastr';
import { ViewPost } from '../models/viewPost';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private connectionId: string = "";
  private data!: any;
  public newPostSummaryReceived = new Subject<PostSummary>();
  public aPostHasBeenDeleted = new Subject<number>();
  public aPostHasBeenUpdated = new Subject<ViewPost>();
  public messageReceived = new Subject<Message>();

  constructor(
    private toastr: ToastrService
  ) { }

  public startConnection = (endpointUrl: string) => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/" + endpointUrl)
      .withAutomaticReconnect()
      .build();
    
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      // .then(() => this.getConnectionId())
      .catch(err => console.log('Error while starting connection'));
    
    // this.hubConnection.onreconnected(this.getConnectionId);
  }

  public getConnectionId = () => {
    this.hubConnection.invoke('GetConnectionId')
      .then(data => {
        // every connection has a unique connectionId.
        // even same user from different phones or laptops will have a new connectionId!
        this.connectionId = data;
      });
  }

  public dataListener = (method: string, callback: any) => {
    this.hubConnection.on(method, (data: any, message: string, title: string) => {
      console.log(data);
      this.data = data;
      this.toastr.info(message, title);
      callback.next(data); // the callback is actually here a subject which is emitting via next() method for its receivers..
    });
  }

  public invokeMethod = (method: string, data: any, userId?: string) => {
    if(!userId) this.hubConnection.invoke(method, data);
    else this.hubConnection.invoke(method, data, userId);
  }

  public terminateHubConnection() {
    this.hubConnection.stop();
  }

}
