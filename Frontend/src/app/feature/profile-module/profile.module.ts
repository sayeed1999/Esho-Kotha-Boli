import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';
import { RoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    RoutingModule,
    SharedModule,
  ]
})
export class ProfileModule { }
