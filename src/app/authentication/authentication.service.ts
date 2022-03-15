import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from '../_models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  baseUrl = "https://localhost:44351/api/";

  //store the last emited value
  private curentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.curentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    //rxjs pipe use for to define operator
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // like array map, take a function, in here recieve http response
      map((response:any) => {
        const user = response;
        // if user not null
        if(user){
          localStorage.setItem('user', JSON.stringify(user))
          this.curentUserSource.next(user)
          //console.log('hello', this.curentUserSource)
        }
      })
    )
  }

  setCurrentUser(user:User){
    this.curentUserSource.next(user);
  }

  logout(){
    localStorage.removeItem('user');
    this.curentUserSource.next(null) 
  }

}
