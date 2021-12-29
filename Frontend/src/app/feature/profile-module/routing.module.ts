
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { UserResolver } from "../../utility/route-resolvers/user-resolver";
import { ProfileComponent } from "./profile.component";

const routes: Routes = [
    {
        path: ':username',
        component: ProfileComponent,
        resolve: { routeResolver: UserResolver }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutingModule {

}