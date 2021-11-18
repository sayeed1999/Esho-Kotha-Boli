import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppNewsfeedComponent } from './app-newsfeed-module/app-newsfeed.component';
import { LoggedInGuard } from './utility/guards/logged-in.guard';
import { ProfileComponent } from './profile-module/profile.component';
import { UserResolver } from './route-resolvers/user-resolver';


const routes: Routes = [
  { 
    path: 'newsfeed', 
    component: AppNewsfeedComponent 
  },
  {
    path: 'account', 
    canActivateChild: [LoggedInGuard], 
    loadChildren: () => import('./account-module/account-routing.module').then(m => m.AccountRoutingModule)
  },
  { 
    path: 'profile/:username', 
    component: ProfileComponent, 
    resolve: { routeResolver: UserResolver } 
  },
  { 
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'account/login' 
  },
  { 
    path: '**', 
    redirectTo: 'account/login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
