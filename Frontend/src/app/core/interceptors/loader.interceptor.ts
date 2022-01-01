import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@microsoft/signalr';
import { cwd } from 'process';
import { SweetAlertService } from '../services/sweet-alert.service';
import { AuthResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root'
})
export class LoaderInterceptor implements HttpInterceptor {

  constructor(
    private httpService: HttpService,
    private sweetAlertService: SweetAlertService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // return next.handle(request);

    this.httpService.requestSent();
    return new Observable((observer) => {

      // Subscribing to requests
      next.handle(request).subscribe(

        (res: HttpEvent<any>) => { // continuing the HTTP cycle
          this.httpService.responseReceived();
          observer.next(res);
        },

        (err: HttpErrorResponse) => { // Handling Errors
          console.log(err)
          
          let message = '';

          if(err.status === 0) {
            message = '[x] Try with proper connection.';
          }
          else if (err.error instanceof AuthResponse) {
            message = err.error.message;
          }
          else { // err.error instanceof string
            message = err.error;
          }

          this.sweetAlertService.textNIcon(message, 'error');
          this.httpService.responseReceived();
        },

        () => { // complete
          // if you want to do anything, you can!
        }

        // when the http req-res is a success, complete executes, otherwise not.
      );
    });
  }
}
