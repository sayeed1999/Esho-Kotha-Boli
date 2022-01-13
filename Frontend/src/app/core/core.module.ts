import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './interceptors/loader.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { LoaderComponent } from './components/loader/loader.component';

import { ToastrModule } from 'ngx-toastr';

export const interceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];

@NgModule({
  declarations: [
    AppShellComponent,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'top-left',
      closeButton: false
    })
  ],
  exports: [
    AppShellComponent,
  ],
  providers: [
    interceptorProviders // A -> B -> C -> C -> B -> A
  ]
})
export class CoreModule { }
