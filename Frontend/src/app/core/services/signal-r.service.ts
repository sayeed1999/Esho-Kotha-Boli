import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { PostSummary } from '../models/postSummary';

import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private data!: any;
  public newPostSummaryReceived = new Subject<PostSummary>();

  constructor(
    private toastr: ToastrService
  ) { }

  public startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://localhost:5001/newsfeed")
      .build();
    
    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => console.log('Error while starting connection'))  
  }

  public dataListener = () => {
    this.hubConnection.on('newPostFound', (data) => {
      this.data = data;
      /// TODO: put a toaster here
      this.toastr.info("New post on top", "New Post");
      this.newPostSummaryReceived.next(data);
    });
  }

  public invokeMethod = (postId: number) => {
    this.hubConnection.invoke("NewPostCreated", postId)
  }

}
