import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { PresenceService } from './presence.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  //store the last emited value
  private curentUserSource = new ReplaySubject<User | null>(1)
  // the reason behind to define this as Observable so that we can share replySubect to other component
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http: HttpClient, private presence:PresenceService) { }

  login(model: any) {
    //rxjs pipe use for to define operator
    return this.http.post(environment.apiUrl + 'account/login', model).pipe(
      // like array map, take a function, in here recieve http response (each data emitted by sorce observable)
      // in map function we can get back specific data
      map((response: any) => {
        console.log(response)
        const user = response;
        // if user not null
        if (user) {
          this.setCurrentUser(user)
          this.presence.createHubConnection(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    if (user) {
      user.roles = [];
      // we use role at the end because jwt token has specific key with name role
      const userRoles = this.getDecodedToken(user.token).role;

      //now if user has one role than jwt token will not provide us array, if it is multiple 
      //role then jwt token will provide an array
      Array.isArray(userRoles) ? user.roles = userRoles : user.roles.push(userRoles);

      localStorage.setItem('user', JSON.stringify(user))
      this.curentUserSource.next(user);
    }
  }

  register(model: any) {
    return this.http.post(environment.apiUrl + 'account/register', model).pipe(
      map((user: any) => {
        if (user) {
          this.setCurrentUser(user)
          this.presence.createHubConnection(user)
        }
        //return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.curentUserSource.next(null)
    this.presence.stopHubConnection();
    //console.log(this.curentUserSource);
  }


  getDecodedToken(token: string) {

    //atob allow us to decode the information inside the token
    //tokens come 3 part we have header payload and other information
    // we need paylod 
    return JSON.parse(atob(token.split('.')[1]))

  }

}
