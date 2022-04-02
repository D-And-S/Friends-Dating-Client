import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';

// we will find sophisticated way to define header 
// const httpOptions = {
//   headers: new HttpHeaders({
//     Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') || '{}')?.token
//   })
// }

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  members: Member[] = []

  constructor(private http: HttpClient) { }

  getMembers() {   
    if(this.members.length > 0){
      //console.log(this.members)
      return of(this.members); 
    } 
    return this.http.get<Member[]>(environment.apiUrl + 'users').pipe(
      map(members=>{
        this.members = members
        
        return members;
      })
    )
    
  }

  getMember(username: string) { 
    const member = this.members.find(x=>x.userName === username);
    if(member !== undefined){
      //console.log(member)
      return of(member)
    } 
    
    return this.http.get<Member>(environment.apiUrl + 'users/GetUserByUsername/' + username)
  }

  updateMember(user: Member) {
    return this.http.put(environment.apiUrl + 'users/UpdateUser', user).pipe(
      map(()=>{
       const index = this.members.indexOf(user)           
      })
    )
  }

}
