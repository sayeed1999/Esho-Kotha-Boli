import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RoutingModule } from './routing.module';



@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RoutingModule
  ],
  exports: [
    ProfileComponent
  ]
})
export class ProfileModule { }
