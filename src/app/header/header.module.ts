import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../_modules/shared/shared.module';

@NgModule({
  declarations: [
    TopNavbarComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    AppRoutingModule,
    SharedModule
  ],
  exports: [
    TopNavbarComponent,
  ]
})
export class HeaderModule { }
