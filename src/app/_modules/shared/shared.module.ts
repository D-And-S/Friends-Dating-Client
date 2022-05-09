import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination'
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { TimeagoModule } from 'ngx-timeago';
import { CustomPaginationComponent } from 'src/app/custom-pagination/custom-pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HasRoleDirective } from 'src/app/_directives/has-role.directive';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    CustomPaginationComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    BsDropdownModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    TimeagoModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    FormsModule,
    ModalModule.forRoot()
    
  ],
  exports: [
    ToastrModule,
    BsDropdownModule,
    TabsModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDatepickerModule,
    PaginationModule,
    ButtonsModule,
    TimeagoModule,
    FormsModule,
    ReactiveFormsModule,
    CustomPaginationComponent,
    HasRoleDirective,
    ModalModule
  ]
})

export class SharedModule { } 
