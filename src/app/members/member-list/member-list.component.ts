import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  // since we return data with pagination that's why 
  members!: Member[];
  pagination: Pagination | any;
  userParams: UserParams | any
  user: User | any;

  genderList = [
    { value: "male" },
    { value: "female" },
  ]

  //members$!:Observable<Member[]>;
  constructor(private memberService: MemberService,
    private route: ActivatedRoute,
    private router: Router) {

    this.userParams = this.memberService.getUserParams();
    //console.log('get', this.userParams)
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params: any) => {
        var pageNo = +params.get('pageNo');
        // console.log(typeof pageNo)
        // console.log(pageNo)
        if (pageNo == null || pageNo <= 0 || isNaN(pageNo)) {
          this.userParams.pageNumber = 1;
        } else {
          this.userParams.pageNumber = params.get('pageNo')
        }
      }
    })
    this.loadMembers();
  }


  loadMembers() {
    //this.memberService.setUserParams(this.userParams)
    this.memberService.getMembers(this.userParams).subscribe({
      next: (response) => {
        //console.log('members',response)
        this.pagination = response.pagination;
        this.members = response.result;
      },
    })
  }

  resetFilters() { 
    this.userParams = this.memberService.resetUserParams()
    this.loadMembers()
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.router.navigateByUrl("members/" + this.userParams.pageNumber)
    this.memberService.setUserParams(this.userParams)
    this.loadMembers();
  }

}
