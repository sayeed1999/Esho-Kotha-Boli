import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { observable, Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AccountService } from "../services/account.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private acc: AccountService,
        private router: Router,
        private sb: MatSnackBar,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        const path = window.location.pathname;
        let error: string|null = null;

        // if the http action is from login/register page, then no need to modify header
        if(path.includes('/account/login') || path.includes('/account/register'))
            return next.handle(req);

        if(!this.acc.isAuthenticated()) { // unauthenticated
            error = 'Not an authenticated user!';
        }
        else if(this.acc.isTokenExpired()) { // check token expiry
            error = 'Authentication expired! Please login again.';
        }
        else {
            // Get the auth token from the service
            const token = this.acc.getAuthToken;

            // Clone the request & replace the original headers with cloned headers, updated with json web token!
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            });

            // pass cloned req with header to the next handler
            return next.handle(authReq).pipe( // intercepting the response to check whether the jwt is expired!
                catchError((err: HttpErrorResponse) => {
                    if(err.status === 401) { // unauthorized(401): not valid authentication
                        this.acc.logoutWithoutAlert();
                        throw new Error(`You cannot navigate to ${path} before loging in.`);
                    }
                    throw err;
                })
            );
        }

        if(error)
            this.acc.logoutWithoutConfirmation("Authentication expired! Please login again to continue.")
        
        return next.handle(req);
    }
}