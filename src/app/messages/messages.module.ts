import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MessageComponent } from './message/message.component';
import { SharedModule } from '../_modules/shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { MemberMessageComponent } from './member-message/member-message.component';


@NgModule({
  declarations: [
    MessageComponent,
    MemberMessageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  exports: [
    MemberMessageComponent
  ]
})
export class MessagesModule { }
