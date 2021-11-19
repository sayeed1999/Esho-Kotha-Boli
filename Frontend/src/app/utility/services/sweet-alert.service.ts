import { Injectable } from '@angular/core';
import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  // single message
  singleMessage(message: string) {
    swal(message);
  }

  // confirm ? yes or no
  confirm(message: string) {
    swal(message)
    .then((yes: boolean) => {
      !!yes
      ? swal('Confirmed!')
      : swal({ text: 'Rejected!', icon: 'error' });
    });
  }

  // title, text
  titleNText(title: string, text: string) {
    swal(title, text);
  }

  // title, text, alert icon
  titleNTextNAlertIcon(title: string, text: string, alert: string) {
    swal(title, text, alert); // alert icon: warning, error, success, info
  }

  // title, text, alert icon, one button
  titleNTextNAlertIconNButton(title: string, text: string, alert: string, button: string) {
    swal(title, text, alert, button);
  }

}
