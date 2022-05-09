import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { RoleModalComponent } from 'src/app/modals/role-modal/role-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: Partial<User[]> | any
  bsModalRef?: BsModalRef;

  constructor(private adminService: AdminService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsersWithRoles()
  }

  getUsersWithRoles() { 
    this.adminService.getUsersWithRoles().subscribe(users => {
      this.users = users;
    })
  }

  openRolesModal(user: User) {
    // this for inside modal data
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        roles: this.getRolesArray(user)
      }
    }
    this.bsModalRef = this.modalService.show(RoleModalComponent, config);

    // this code is for after click submit button inside modal
    this.bsModalRef.content.updateSelectedRoles.subscribe((values: any[]) => {

      // this line will check how many items is checked
      var totalCheckedRole = [...values.filter((el: any) => el.checked === true)]

      if(totalCheckedRole.length == 0) {
        alert("Please Select at least one role!!!")
        return;
      }

      const rolesToUpdate = {
        roles: [...values.filter((el: any) => el.checked === true).map(el => el.name)]
      };
      
      
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user.username, rolesToUpdate.roles).subscribe({
          next: (v) => {
            user.roles = [...rolesToUpdate.roles]
          },

          complete: () => {
            this.bsModalRef?.hide()
          }
        })
      }
    })
  }

  // this method gives us array of roles with checked or not checked
  private getRolesArray(user: User) {
    const roles: any = []
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Member', value: 'Member' }
    ]

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role)
          break;
        }
      }

      if (!isMatch) {
        role.checked = false;
        roles.push(role)
      }
    });
    return roles;
  }
}


