import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { AccountService } from "../services/account.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private acc: AccountService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
            if(window.location.pathname.includes('/account/login') || window.location.pathname.includes('/account/register'))
                return next.handle(req);
            
            // check token expiry
            if(this.acc.isTokenExpired) {
                console.log('expired')
                this.acc.logout();
            }

            // Get the auth token from the service
            const token = this.acc.getAuthToken;

            // Clone the request & replace the original headers
            // with cloned headers, updated with json web token!
            const authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`),
            })

            // pass cloned req with header to the next handler
            return next.handle(authReq).pipe(
                // intercepting the response to check whether the jwt is expired!
                catchError((err: HttpErrorResponse) => {
                    if(err.status === 401) {
                        // unauthorized(401): not valid authentication
                        this.acc.logout();
                        this.router.navigate(['account', 'login']);
                        throw new Error('Request cannot be proccessed in an unauthenticate state.');

                    }
                    throw err;
                })
            );
    }
}