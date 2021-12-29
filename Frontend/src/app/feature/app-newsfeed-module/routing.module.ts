import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AppNewsfeedComponent } from "./app-newsfeed.component";

const routes: Routes = [
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