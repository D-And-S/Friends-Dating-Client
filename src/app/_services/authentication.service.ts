import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  //store the last emited value
  private curentUserSource = new ReplaySubject<User | null>(1)
  // the reason behind to define this as Observable so that we can share replySubect to other component
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    //rxjs pipe use for to define operator
    return this.http.post(environment.apiUrl + 'account/login', model).pipe(
      // like array map, take a function, in here recieve http response
      // in map function we can get back specific data
      map((response: any) => {
        const user = response;
        // if user not null
        if (user) {
          this.setCurrentUser(user)
        }
      })
    )
  }

  setCurrentUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user))
    this.curentUserSource.next(user);
  }

  register(model: any) {
    return this.http.post(environment.apiUrl + 'account/register', model).pipe(
      map((user: any) => {
        if (user) {
          this.setCurrentUser(user)
        }
        //return user;
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.curentUserSource.next(null)
  }

}
