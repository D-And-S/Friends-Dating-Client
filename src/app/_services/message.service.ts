import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/message';
import { PaginatedService } from './paginated.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private paginatedService: PaginatedService) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = this.paginatedService.getPaginationHeaders(pageNumber, pageSize)
    params = params.append('container', container)

    return this.paginatedService
      .getPaginatedResult<Message[]>(environment.apiUrl + 'Messages/GetMessagesForUser', params);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(environment.apiUrl + 'messages/thread/' + username);
  }

  sendMessage(recipientUsername: string, content: string) {
    return this.http.post<Message>(environment.apiUrl + 'messages', { recipientUsername: recipientUsername, content: content })
  }

  deleteMessage(id:number){
    return this.http.delete(environment.apiUrl + 'messages/delete/'+id)
  }


}
