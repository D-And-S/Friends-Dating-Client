import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// we will find sophisticated way to define header 
const httpOptions = {
  headers: new HttpHeaders({
    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}').token
  })
}

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {}

  getMembers(){
    return this.http.get<Member[]>(environment.apiUrl+'users', httpOptions)
  }

  getMember(username:string){
    return this.http.get<Member>(environment.apiUrl+'users/GetUserByUsername/'+username, httpOptions)
  }

}
