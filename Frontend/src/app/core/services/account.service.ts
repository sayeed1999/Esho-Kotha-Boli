import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../models/authResponse';
import { LoginUser } from '../models/loginUser';
import { RegisterUser } from '../models/registerUser';
import { ViewUser } from '../models/viewUser';
import { SweetAlertService } from './sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private authenticationState: 'authenticated'|'unauthenticated' = 'unauthenticated';
  private userName = 'guest user';
  authenticationStateChanged = new Subject<boolean>();
  private url: string = 'https://localhost:5001/account';

  constructor(
    private http: HttpClient,
    private sweetalert: SweetAlertService,
    private router: Router,
  ) {
    if(sessionStorage.getItem('token') !== null) {
      this.authenticationState = 'authenticated';
      this.userName = sessionStorage.getItem('userName') ?? '<bug>';
    }
    // this method is to it checks token expiry and then user logged out if expired!!
  }

  get getCurrentUser(): Observable<ViewUser> {
    return this.http.get<ViewUser>(`${this.url}/current-user`);
  }

  isTokenExpired(): boolean {
    const token = sessionStorage.getItem('token') || '';
    const expiry = (JSON.parse(window.atob(token.split('.')[1]))).exp; // 'atob' stands for  'ASCII TO Binary'
    console.log((new Date()).getTime() / 1000, expiry);
    const isExpired = Math.floor( (new Date()).getTime() / 1000 ) >= expiry;
    isExpired === true ? this.logoutWithoutAlert() : null;
    return isExpired;
  }

  isAuthenticated(): boolean {
    return this.authenticationState === 'authenticated';
  }

  getUserName(): string {
    return this.userName;
  }

  get getAuthToken(): string {
    return sessionStorage.getItem('token') || '';
  }

  logoutWithoutAlert() {
    this.authenticationState = 'unauthenticated';
    sessionStorage.removeItem('token');
    this.userName = 'guest-user';
    sessionStorage.removeItem('userName');
    this.authenticationStateChanged.next(false);
  }

  logoutWithoutConfirmation(message?: string) {
    this.logoutWithoutAlert();
    this.sweetalert.textNIcon(message ?? "You have successfully logged out of your account", "success");
    this.router.navigate(['account', 'login']);
  }

  logout() {
    this.sweetalert.confirm(
      "Are you sure?",
      () => {
        this.logoutWithoutConfirmation();
      }
    );
  }

  login(user: LoginUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.url}/login`,
      user
    ).pipe(
      tap((res: AuthResponse) => {
        this.authenticationState = 'authenticated';
        sessionStorage.setItem('token', res.token);
        this.userName = res.userName;
        sessionStorage.setItem('userName', res.userName);
        this.authenticationStateChanged.next(true);
      }
    ));
  }

  register(user: RegisterUser): Observable<Object> {
    return this.http.post(
      this.url + '/register',
      user
    );
  }

  getAllRelationshipStatus(): Observable<any> {
    return this.http.get(
      this.url + '/relationship-status'
    );
  }

  getAllSex(): Observable<any> {
    return this.http.get(
      this.url + '/sex'
    );
  }
}
