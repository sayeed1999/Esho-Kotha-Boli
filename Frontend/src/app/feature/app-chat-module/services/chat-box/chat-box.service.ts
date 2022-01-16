import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Message } from 'src/app/core/models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatBoxService {

  url = 'https://localhost:5001/messaging';
  chatWith = new Subject<any>(); // will emit userForPeopleBoxVm..
  
  constructor(
    private httpClient: HttpClient,
  ) { }

  sendMessageAsync(message: any): Observable<Message> {
    return this.httpClient.post<Message>(this.url + '/messages/create', message);
  }

  getMessagesAsync(from: string, to: string): Observable<Message[]> {
    return this.httpClient.get<Message[]>(`${this.url}/messages/${from}/${to}`);
  }
}
