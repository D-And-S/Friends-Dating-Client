import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmWindowService } from '../_services/confirm-window.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmWindowService) { }
  // this dialog for normal javascript
  // canDeactivate(component: MemberEditComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   if(component.editForm.dirty){
  //     return confirm("Are you sure? Any changes will be lost")
  //   }
  //   return true;
  // }

  // this is ngx dialog
  canDeactivate(component: MemberEditComponent): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.editForm.dirty) {
      return this.confirmService.confirm()
    }
    return true;
  }

}
