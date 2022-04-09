import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberCardComponent } from './member-card/member-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../_modules/shared/shared.module';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { FormsModule } from '@angular/forms';
import { PhotoEditorComponent } from './photo-editor/photo-editor.component';


@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberCardComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
  ],
  exports: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberEditComponent,
  ]
})
export class MembersModule { }
