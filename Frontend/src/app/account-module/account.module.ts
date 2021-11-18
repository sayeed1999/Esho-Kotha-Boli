import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared-module/shared.module';



@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ],
  exports: [
    AccountComponent,
  ]
})
export class AccountModule { }
