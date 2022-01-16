import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MessengerComponent } from "./components/messenger/messenger.component";

const routes: Routes = [
    {
        path: '',
        component: MessengerComponent,
    },
  
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutingModule {

}