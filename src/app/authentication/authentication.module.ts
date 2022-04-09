import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TextInputComponent } from '../_forms/text-input/text-input.component';
import { SharedModule } from '../_modules/shared/shared.module';
import { DateInputComponent } from '../_forms/date-input/date-input.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
    DateInputComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    LoginComponent,
    RegisterComponent,
    TextInputComponent,
  ]
})
export class AuthenticationModule { }
