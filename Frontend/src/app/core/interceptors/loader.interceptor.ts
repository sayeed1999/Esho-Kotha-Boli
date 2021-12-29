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

        (res: HttpEvent<any>) => { // should be an HttpResponse
          // continuing the HTTP cycle
          // console.log("success")
          observer.next(res);
        },
        (err: HttpErrorResponse) => {
          // Handling Errors
          // console.log(err)
          if(err.status === 0) {
            this.sweetAlertService.textNIcon('[x] Please try with proper connection.', "error");
          }
          else {
            let res: AuthResponse = err.error;
            this.sweetAlertService.textNIcon(res.errorMessage, "error");
          }
          this.httpService.responseReceived();
        },
        () => {
          // res -> complete (when error occurs, chain don't reach here)
          // console.log("complete")
          this.httpService.responseReceived();
        }
      );
    });
  }
}
