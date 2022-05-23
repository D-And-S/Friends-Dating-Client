import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Observable, of, take } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  //template referance and viewchild use kore kono form ar object access korar jay
  @ViewChild('memberTabs', { static: true }) memberTabs: TabsetComponent | any;
  member: Member | any;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  activeTab: TabDirective | any;
  messages: Message[] = [];
  user: User | any;

  constructor(private memberService: MemberService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    public presence: PresenceService,
    private accountService: AuthenticationService,
    private router:Router) {

      // this is for angular router reuse route as much as possible
      // mane hocche jodi amra directly kono url click krlam but sei component e data dekhanor kotha
      // kintu data jodi nah show kore ar mane route url router ke re use kortese. 
      // sekheter data dekhanor jonno reuse ke false kora. 
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;

      this.accountService.currentUser$.pipe(take(1)).subscribe({
        next: (user) => {
          this.user = user
        }
      });
  }

  ngOnInit(): void {
    

    this.route.data.subscribe(data => {
      this.member = data['member']; // route resolver key
    })

    this.route.queryParams.subscribe(parmas => {
      var tabId = +parmas['tab']
      parmas['tab'] ? this.selectTab(tabId) : this.selectTab(0)
    })

    this.galleryOption()
  }



  galleryOption() {
    this.galleryOptions = [
      {
        width: '600px',
        height: '400px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    /*setting image in here will provide undefine error because 
    everything happeining in ng on is asynchronouse
    that's why we define the image after the member load */
    this.galleryImages = this.getImages()
  }

  getImages(): NgxGalleryImage[] {
    const imageUrl = [];
    for (const photo of this.member.photos) {
      imageUrl.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }
    return imageUrl;
  }

  // *** we don't need loadMember because we use route resolver 
  // loadMember() {
  //   this.memberService.getMember(this.route.snapshot.params['username']).subscribe({
  //     next: (member) => {
  //       this.member = member

  //       //console.log(this.member)
  //       this.galleryImages = this.getImages()
  //     }
  //   })
  // }

  onTabActivated(data: TabDirective) {
    this.activeTab = data;
    if (this.activeTab.heading === 'Messages' && this.messages.length === 0) {
      //this.loadMessages()
      // since we are using signal r that's why we comment load message instead we will use message hub
      this.messageService.createHubConnection(this.user, this.member.userName);  
    } else {
      this.messageService.stopHubConnection()
    }
  }

  selectTab(tabId: number) {
    //console.log(this.memberTabs)
    this.memberTabs.tabs[3].active = true;
    //console.log(this.memberTabs)
  }

  loadMessages() {
    this.messageService.getMessageThread(this.member.userName).subscribe(messages => {
      this.messages = messages
    });
  }

  ngOnDestroy(): void {
    // on destroy means if leve the component an
    // if user leave the member-details component that it will stop connection
    this.messageService.stopHubConnection()
  }
}
