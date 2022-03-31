import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_modules/shared/shared.module';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [
    MemberListComponent,
    MemberDetailsComponent,

  ]
})
export class MembersModule { }
