import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { AppNewsfeedComponent } from './app-newsfeed/app-newsfeed.component';
import { LoggedInGuard } from './guards/logged-in.guard';
import { ProfileComponent } from './profile/profile.component';
import { UserResolver } from './route-resolvers/user-resolver';


const routes: Routes = [
  { path: 'newsfeed', component: AppNewsfeedComponent },
  { path: 'account', canActivateChild: [LoggedInGuard], component: AccountComponent, children: 
    [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ]
  },
  { path: 'profile/:username', component: ProfileComponent, resolve: { routeResolver: UserResolver } },
  { path: '', pathMatch: 'full', redirectTo: 'account/login' },
  { path: '**', redirectTo: 'account/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
