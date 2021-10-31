import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppNewsfeedModule } from './app-newsfeed/app-newsfeed.module';
import { AppChatModule } from './app-chat/app-chat.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AccountModule } from './account/account.module';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { ProfileModule } from './profile/profile.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AppNewsfeedModule,
    AppChatModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AccountModule,
    ProfileModule,
  ],
  providers: [
    // auth interceptor for engaging jwt token
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
