import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css']
})
export class AppShellComponent implements OnInit {

  title = 'EshoKothaBoli';
  authenticated = false;
  userName!: string;

  constructor(
    private acc: AccountService,
    private sb: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    // we dont need to unsubscribe it, since it is on the root
    // level, this component never gets destroyed.
    this.authenticated = this.acc.isAuthenticated;
    this.userName = this.acc.userName;
    this.acc.authenticationStateChanged.subscribe(b => {
      this.authenticated = this.acc.isAuthenticated;
      this.userName = this.acc.userName;
    });
  }

  logout() { 
    this.acc.logout();
    // this.sb.open('You are loggeds out of your account!', 'Dismiss');
    // this.router.navigateByUrl('/account/login');
  }

}
