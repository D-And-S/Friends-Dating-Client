import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { Pagination } from 'src/app/_models/pagination';
import { ConfirmWindowService } from 'src/app/_services/confirm-window.service';
import { MessageService } from 'src/app/_services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages: Message[] = [];
  pagination: Pagination | any
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(private messageSerive: MessageService, private confirmService: ConfirmWindowService) { }

  ngOnInit(): void {
    this.loadMessages()
  }

  loadMessages() {
    this.loading = true;
    this.messageSerive.getMessages(this.pageNumber, this.pageSize, this.container).subscribe({
      next: (res) => {
        //console.log('messages', res)
        this.messages = []
        this.messages = res.result;
        this.pagination = res.pagination;
        this.loading = false;
      }
    })
  }

  pageChanged(event: any) {
    this.pageNumber = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.confirmService.confirm('Confirm delete message', 'This cannot be undone').subscribe(result=> {
      if(result){
        this.messageSerive.deleteMessage(id).subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1)
        })
      }
    })
   
  }

}
