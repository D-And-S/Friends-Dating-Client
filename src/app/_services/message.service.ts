import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { group } from 'console';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from '../_models/group';
import { Message } from '../_models/message';
import { User } from '../_models/user';
import { PaginatedService } from './paginated.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private hubConnection: HubConnection | any;
  private messageThreadSource = new BehaviorSubject<Message[]>([])
  messageThread$ = this.messageThreadSource.asObservable()

  constructor(private http: HttpClient,
    private paginatedService: PaginatedService) { }

  createHubConnection(user: User, otherUsername: string) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubUrl + 'message?user='+otherUsername, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect() 
      .build() 

    this.hubConnection
      .start()
      .catch((error: any) => console.log(error))

      

    //console.log(this.hubConnection)

    this.hubConnection.on('ReceiveMessageThread', (messages: any) => {
      // here is messages variable data is coming from message hub and api
      this.messageThreadSource.next(messages);

      console.log(this.messageThread$)
    })

    // we will get the new message from the hub
    this.hubConnection.on('NewMessage', (message: any) => {
      this.messageThread$.pipe(take(1)).subscribe({
        next: (messages) => {
          // this spread operator concate message object with new message object
          this.messageThreadSource.next([...messages, message])      
        }    
      })
    })

    this.hubConnection.on('UpdatedGroup', (group:Group)=> {
      if(group.connections.some(x=>x.username === otherUsername)){
        this.messageThread$.pipe(take(1)).subscribe(messages=> {
           messages.forEach(messages=> {
             if(!messages.dateRead){
               messages.dateRead = new Date(Date.now())
             }
           })
           this.messageThreadSource.next([...messages])
        })
      }
    })

  }

  stopHubConnection() {
    /***  
     
      it is possible that hubconnection may stop multiple time
      which can be create problem
      such user go to message table it will create connection. 
      then he goes to about page it will stop connection
      then somehow component destroyed. it will stop connection again. 
      multiple stop connection can cause problem that's why we stop connection with if block

    ***/
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = this.paginatedService.getPaginationHeaders(pageNumber, pageSize)
    params = params.append('container', container)

    return this.paginatedService
      .getPaginatedResult<Message[]>(environment.apiUrl + 'Messages/GetMessagesForUser', params);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(environment.apiUrl + 'messages/thread/' + username);
  }

  // the purpose of async keyword here is that we guarentee that we are returning promise
  async sendMessage(recipientUsername: string, content: string) {
    // this is for api message
    //return this.http.post<Message>(environment.apiUrl + 'messages', { recipientUsername: recipientUsername, content: content })

    // this is for real time signal 
    // invoke is for call to hub method
    // invoke method return promise. it's nto return ovservable 

    return this.hubConnection.invoke('SendMessage', { recipientUsername: recipientUsername, content: content })
      .catch((error: any) => console.log(error))
  }

  deleteMessage(id: number) {
    return this.http.delete(environment.apiUrl + 'messages/delete/' + id)
  }

}
