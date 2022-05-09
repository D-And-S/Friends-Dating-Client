import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { take } from 'rxjs';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective implements OnInit {
  // we created this custom directive for not showing admin naviagation to other role

  // viewcotnainer helps us to attach one or more view like *ngif use kora jodi condiaiton mile tahole component thakbe 

  // when we use this directive we use like *appHasRole = '["Admin"]' 

  @Input() appHasRole!: string[] ;
  user: User | any;
  
  constructor(private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>, // template ref use by with prefix * and it will embedded component (this means particular condition ar upor component show kora)
    private accountService: AuthenticationService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
    })
  }

  ngOnInit(): void {
    //clear view if no rolse
    if (!this.user?.roles || this.user == null) {
      this.viewContainerRef.clear();
      return;
    }

    //some function expect a function which has array and based on that array it return true or false
    // if there is role
    //here r represent role 

    if (this.user?.roles.some((r: any) => this.appHasRole.includes(r))) {
      this.viewContainerRef.createEmbeddedView(this.templateRef)
    }else {
      // if the role is not admin then other user will not show this component
      this.viewContainerRef.clear()
    }

  }

}
