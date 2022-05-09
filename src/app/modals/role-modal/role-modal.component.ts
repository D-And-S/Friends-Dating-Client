import { Component, Input, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';


@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent implements OnInit {
  @ViewChild('rolesForm') rolesForm: any;
  @Input() updateSelectedRoles = new EventEmitter();
  user: User | any;
  roles: any

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

  }

  updateRoles() {
    //console.log(this.rolesForm)
    this.updateSelectedRoles.emit(this.roles)

  }

}
