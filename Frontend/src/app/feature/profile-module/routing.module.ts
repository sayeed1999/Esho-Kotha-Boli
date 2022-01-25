
import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { UserResolver } from "../../utility/route-resolvers/user-resolver";
import { ProfileComponent } from "./components/profile/profile.component";

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