import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Member } from '../_models/member';
import { MemberService } from '../_services/member.service';

@Injectable({
  providedIn: 'root'
})

export class MemberDetailsResolver implements Resolve<Member> {

  constructor(private memberService: MemberService) { }

  resolve(route: ActivatedRouteSnapshot | any, state: RouterStateSnapshot): Observable<Member> {

    return this.memberService.getMember(route.paramMap.get('username'));

  }

}
