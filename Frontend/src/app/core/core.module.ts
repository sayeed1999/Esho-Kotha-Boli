import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppShellComponent } from './components/app-shell/app-shell.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';



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
  ],
  exports: [
    AppShellComponent,
  ]
})
export class CoreModule { }
