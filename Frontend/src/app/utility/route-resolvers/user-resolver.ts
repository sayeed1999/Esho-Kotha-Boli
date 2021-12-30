import { HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { empty, Observable, of } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { AccountService } from "../../core/services/account.service";

@Injectable({ providedIn: "root" })
export class UserResolver implements Resolve<any> {
    
    constructor(private acc: AccountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<any>|Promise<any>|any 
    {
        const username: string = route.paramMap.get('username') || '';
        console.log('Trying to resolve user - ' + username);
        return this.acc.getCurrentUser.pipe(
            take(1)
            ,catchError((error) => {
                return empty();
            })
        );
    }

}