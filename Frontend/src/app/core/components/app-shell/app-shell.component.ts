import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {

  isLoading: boolean = false;
  title = 'EshoKothaBoli';
  authenticated = false;
  userName = 'guest-user';

  constructor(
    private httpService: HttpService,
    private acc: AccountService,
  ) {}

  ngOnInit(): void {
    this.authenticated = this.acc.isAuthenticated();
    this.userName = this.acc.getUserName();

    // needed for the loader
    this.httpService.subject.subscribe(
      (res: boolean) => {
        this.isLoading = res;
      }
    )

    this.acc.authenticationStateChanged.subscribe(b => {
      console.log(b)
      this.authenticated = this.acc.isAuthenticated();
      this.userName = this.acc.getUserName();
    });

    // the first time the app loads, the token expiry is checked and signed out
    if(localStorage.getItem('token') && this.acc.isTokenExpired()) this.acc.logoutWithoutAlert();
  }

  logout() { 
    this.acc.logout();
  }

}
