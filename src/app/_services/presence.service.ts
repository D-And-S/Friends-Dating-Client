import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

// this is for to show user is online or offline
export class PresenceService {

  private hubConnection: HubConnection | any;

  // we can establish cross communication form behaviroSubject with initial value, 
  //in this case empty array. why empty array because we store onine user's username here
  private onlineUsersSource = new BehaviorSubject<string[]>([])
  onlineUser$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  // we call this method if the user is logged in
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.hubUrl + 'presence', {
        // this access token is for user authentication for signalR
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect() // if there is network problem client with autometically try to connect
      .build() // build the connection so that hube is connected


    // after building the connection we need to start the connection
    this.hubConnection
      .start()
      .catch((error: any) => console.log(error)) // if there is any error it will show in the console

    // then client will match the connection method that defined in backend
    // when any user in online it will hit 


    this.hubConnection.on('UserIsOnline', (username: any) => {
      this.onlineUser$.pipe(take(1)).subscribe(usernames => {
        //add user to the list whille connecting
        this.onlineUsersSource.next([...usernames, username])
      })
    })

    // when any user is offline
    this.hubConnection.on('UserIsOffline', (username: any) => {
      this.onlineUser$.pipe(take(1)).subscribe(usernames => {
        // remove user from the list while disconnecting
        this.onlineUsersSource.next([...usernames.filter(x => x !== username)])
      })
    })

    //get all connected user from hub an  store in currentuser name
    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
      //console.log(usernames)
    })

    this.hubConnection.on('NewMessageReceived', (data: any) => {
      this.toastr.info(data.knownAs + ' has sent you a new message!')
        .onTap // when we click the toaster

        // we need stop reuse router in memeber-details-component constructor
        .pipe(take(1)).subscribe(() => this.router.navigateByUrl('/member/' + data.username + '?tab=3'))
    })

  }

  // we call this method when user will close browser or logout 
  stopHubConnection() {
    this.hubConnection.stop()
      .catch((error: any) => console.log(error))
  }
}
