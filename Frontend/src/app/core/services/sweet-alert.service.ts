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
  confirm(message: string, callback: any) {
    swal({ text: message, icon: 'warning' })
    .then((yes: boolean) => {
      !!yes
      ? callback()
      : swal({ text: 'Terminated', icon: 'error' });
    });
  }

  // title, text
  titleNText(title: string, text: string) {
    swal(title, text);
  }

  // title, icon
  textNIcon(text: string, icon: 'warning'|'error'|'success'|'info') {
    swal({
      text: text,
      icon: icon
    });
  }

  // title, text, alert icon
  titleNTextNAlertIcon(title: string, text: string, icon: 'warning'|'error'|'success'|'info') {
    swal(title, text, icon);
  }

  // title, text, alert icon, one button
  titleNTextNAlertIconNButton(title: string, text: string, icon: 'warning'|'error'|'success'|'info', button: string) {
    swal(title, text, icon, button);
  }

}

// How to work with enums ??
// enum AlertType {
//   warning,
//   error,
//   success,
//   info
// }