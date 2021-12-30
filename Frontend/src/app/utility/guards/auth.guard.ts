import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "src/app/core/services/account.service";


@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private acc: AccountService,
                private router: Router,
                private sb: MatSnackBar) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getResult();
    }
    canActivateChild(
      childRoute: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.getResult();
    }
  
    getResult() {
      if (!this.acc.isAuthenticated) {
        this.router.navigate(['account', 'login']);
        return false;
      }
      else {
        return true;
      }
    }
    
  }
  