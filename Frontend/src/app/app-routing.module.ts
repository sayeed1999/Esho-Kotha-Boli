import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './utility/guards/logged-in.guard';


const routes: Routes = [
  {
    path: 'account', 
    canActivateChild: [LoggedInGuard], 
    loadChildren: () => import('./feature/account-module/account.module').then(m => m.AccountModule)
  },
  {
    path: 'chat', 
    loadChildren: () => import('./feature/app-chat-module/app-chat.module').then(m => m.AppChatModule)
  },
  { 
    path: 'newsfeed',
    loadChildren: () => import('./feature/app-newsfeed-module/app-newsfeed.module').then(n => n.AppNewsfeedModule)
  },
  { 
    path: 'profile',
    loadChildren: () => import('./feature/profile-module/profile.module').then(p => p.ProfileModule)
  },
  { // is this bad code? because rest all are link to modules. okay no problem.
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
