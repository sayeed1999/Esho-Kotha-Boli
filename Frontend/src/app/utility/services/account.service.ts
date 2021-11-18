import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../../models/authResponse';
import { LoginUser } from '../../models/loginUser';
import { RegisterUser } from '../../models/registerUser';
import { ViewUser } from '../../models/viewUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  defaultUserName = 'guest';
  userName = this.defaultUserName;
  authenticationStateChanged = new Subject<boolean>();
  private url: string = 'https://localhost:44345/account';

  constructor(
    private http: HttpClient
  ) {
    this.userName = localStorage.getItem('userName') || this.defaultUserName;
  }

  get getCurrentUser(): Observable<ViewUser> {
    return this.http.get<ViewUser>(`${this.url}/current-user`);
  }

  get isTokenExpired(): boolean {
    const token = localStorage.getItem('token') || '';
    if(token === '') return false;
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp; // 'atob' stands for  'ASCII TO Binary'
    return Math.floor( new Date().getTime() / 1000 ) >= expiry;
  }

  get isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  get getAuthToken(): string {
    return localStorage.getItem('token') || '';
  }

  logout() {
    localStorage.removeItem('token');
    this.userName = this.defaultUserName;
    localStorage.removeItem('userName');
    this.authenticationStateChanged.next(false);
  }

  login(user: LoginUser): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.url}/login`,
      user
    ).pipe(
      tap((res: AuthResponse) => {
        localStorage.setItem('token', res.token);
        this.userName = res.userName;
        localStorage.setItem('userName', res.userName);
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
