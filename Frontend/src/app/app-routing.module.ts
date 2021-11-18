import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './utility/guards/logged-in.guard';


const routes: Routes = [
  { 
    path: 'newsfeed',
    loadChildren: () => import('./app-newsfeed-module/routing.module').then(n => n.NewsfeedRoutingModule)
  },
  {
    path: 'account', 
    canActivateChild: [LoggedInGuard], 
    loadChildren: () => import('./account-module/account-routing.module').then(m => m.AccountRoutingModule)
  },
  { 
    path: 'profile',
    loadChildren: () => import('./profile-module/routing.module').then(p => p.RoutingModule)
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
