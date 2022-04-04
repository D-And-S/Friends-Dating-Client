import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MemberService } from 'src/app/_services/member.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm') editForm! : NgForm
  member!:Member;
  user: any;
  // this will notify user after changing form if they accidently close browser
  @HostListener('window:beforeunload',['$event']) unloadNotification($event:any){
    if(this.editForm.dirty){
      $event.returnValue = true;
    }
  }

  constructor(private authService:AuthenticationService, 
              private memberService:MemberService,
              private toastr:ToastrService) {
    
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        this.user = user;
      }
    })
  }

  ngOnInit(): void {
    this.loadMember()
  }

  loadMember(){
    this.memberService.getMember(this.user.username).subscribe({
      next: (member) => {
        this.member = member;
      }
    })
  }

  updateMember(){
    //console.log(this.member)
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success('Profile Updated')
      this.editForm.reset(this.member)
    })
  }
}
