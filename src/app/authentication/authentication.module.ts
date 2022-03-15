import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



@NgModule({
  declarations: [
    NavComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule
  ],
  exports:[
    NavComponent
  ]
})
export class AuthenticationModule { }
