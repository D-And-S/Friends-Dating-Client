import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { AuthenticationModule } from '../authentication/authentication.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown'
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    TopNavbarComponent
  ],
  imports: [
    CommonModule,
    AuthenticationModule,
    BsDropdownModule,
    AppRoutingModule
  ],
  exports: [
    TopNavbarComponent,
  ]
})
export class HeaderModule { }
