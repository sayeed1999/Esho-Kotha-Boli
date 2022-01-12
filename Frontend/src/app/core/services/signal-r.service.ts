import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { PostSummary } from '../models/postSummary';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private data!: any;
  public newPostSummaryReceived = new Subject<PostSummary>();

  constructor() { }

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
    this.hubConnection.on('transferNewsfeedData', (data) => {
      this.data = data;
      // console.log(data)
      this.newPostSummaryReceived.next(data);
    });
  }

}
