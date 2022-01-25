import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { empty, Observable } from "rxjs";
import { catchError, take } from "rxjs/operators";
import { PostService } from "src/app/feature/app-newsfeed-module/services/post.service";

@Injectable({ providedIn: 'root' })
export class PostResolver implements Resolve<any> {

    constructor(private postService: PostService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
        : Observable<any> | Promise<any> | any 
    {
        const postId: string = route.paramMap?.get('id') || '0';

        return this.postService.getById(+postId).pipe(
            take(1)
            ,catchError((error) => {
                return empty();
            })
        );
    }

}