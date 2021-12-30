import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PostResolver } from "src/app/utility/route-resolvers/post-resolver";
import { AppNewsfeedComponent } from "./app-newsfeed.component";
import { PostComponent } from "./post/post.component";

const routes: Routes = [
    {
        path: 'post/:id',
        component: PostComponent,
        resolve: { routeResolver: PostResolver }
    },
    {
        path: '',
        component: AppNewsfeedComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewsfeedRoutingModule {

}