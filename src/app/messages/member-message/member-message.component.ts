import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {
  @ViewChild('messageForm') messageForm!: NgForm;

  @Input() messages: Message[] = [];
  @Input() username!: string;
  messageContent!: string

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {

  }

  sentMessage() {
    // this is for returned API message
    // this.messageService.sendMessage(this.username, this.messageContent)
    //   .subscribe(message => {
    //     this.messages.push(message)
    //     this.messageForm.reset();
    //   })

    //this is for signal R which returned as promise
    this.messageService.sendMessage(this.username, this.messageContent).then(() => {
      this.messageForm.reset();
    })
  }

}
