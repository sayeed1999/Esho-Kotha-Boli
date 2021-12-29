import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private reqProcessing: boolean = false;
  subject = new Subject<boolean>();

  constructor() { }

  get isReqProcessing(): boolean { // public by default
    return !!this.reqProcessing;
  }

  requestSent(): void {
    this.reqProcessing = true;
    this.subject.next(true);
  }

  responseReceived(): void {
    this.reqProcessing = false;
    this.subject.next(false);
  }

}
