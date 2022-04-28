import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Observable, of } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { Message } from 'src/app/_models/message';
import { MemberService } from 'src/app/_services/member.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  //template referance and viewchild use kore kono form ar object access korar jay
  @ViewChild('memberTabs', {static:true}) memberTabs: TabsetComponent | any;
  member: Member | any;
  galleryOptions!: NgxGalleryOptions[];
  galleryImages!: NgxGalleryImage[];
  activeTab: TabDirective | any;
  messages: Message[] = [];

  constructor(private memberService: MemberService,
    private route: ActivatedRoute, private messageService: MessageService) { }

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
      this.loadMessages()
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
}
