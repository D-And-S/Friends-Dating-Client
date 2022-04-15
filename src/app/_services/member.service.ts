import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { AuthenticationService } from './authentication.service';
import { User } from 'src/app/_models/user';

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

  members: Member[] = [];
  memberCache = new Map();
  user: User | any;
  userParams: UserParams | any;

  constructor(private http: HttpClient,
    private accountService: AuthenticationService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.userParams = new UserParams(user)
    })
  }

  getUserParams(){
    return this.userParams;
  }

  setUserParams(params: UserParams){
    this.userParams = params
  }

  resetUserParams(){
    //console.log(this.user)
    this.userParams = new UserParams(this.user)
    return this.userParams;
  }

  getMembers(userParams: UserParams) {

    /*if (this.members.length > 0) {
      //console.log(this.members)
      return of(this.members);
    }
    return this.http.get<Member[]>(environment.apiUrl + 'users').pipe(
      map(members => {
        this.members = members
        return members;
      })
    )*/

    //when we use map we can set the value as key and get the value by key
    var response = this.memberCache.get(Object.values(userParams).join('-'))
    if (response) {
      return of(response)
    }

    let params = this.getPaginationHeaders(userParams.pageNumber, userParams.pageSize)
    params = params.append('minAge', userParams.minAge.toString())
    params = params.append('maxAge', userParams.maxAge.toString())
    params = params.append('gender', userParams.gender)
    params = params.append('orderBy', userParams.orderBy)

    //console.log('params', params)
    return this.getPaginatedResult<Member[]>(environment.apiUrl + 'users', params).pipe(
      map((response) => {
        this.memberCache.set(Object.values(userParams).join('-'), response)
        //console.log('response',response)
        //console.log('member', this.memberCache)
        return response
      })
    )
  }

  getMember(username: string) {
    /*const member = this.members.find(x => x.userName === username);
    if (member !== undefined) {
      //console.log(member)
      return of(member)
    }*/

    //get single member from cache
    const member = [...this.memberCache.values()]

      // we want all member array into an single array
      /*.
        here previous value is member array
        member arra contains the result object
        we just concat the previous value with current value
      */
      .reduce((previousValue, currentValue) => previousValue.concat(currentValue.result), [])
      .find((member: Member) => member.userName === username) // find the first occurance if there is any ducplicate

    //console.log('member', member);
    if (member) {
      return of(member)
    }

    return this.http.get<Member>(environment.apiUrl + 'users/GetUserByUsername/' + username)
  }

  updateMember(user: Member) {
    return this.http.put(environment.apiUrl + 'users/UpdateUser', user).pipe(
      map(() => {
        const index = this.members.indexOf(user)
      })
    )
  }

  setMainPhoto(photoId: number) {
    return this.http.put(environment.apiUrl + 'users/set-main-photo/' + photoId, {})
  }

  deletePhoto(PhotoId: number) {
    return this.http.delete(environment.apiUrl + 'Users/delete-photo/' + PhotoId)
  }

  private getPaginatedResult<T>(url: any, params: any) {
    //{observe:'response', params} it will pass the parameter as query string
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map((response: any) => {
        //console.log('response', response)
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    )
  }

  private getPaginationHeaders(pageNumber: number, pageSize: number) {
    /*
      For Pagination
    */
    // httpParams will give us to serialize the parameter
    let params: any = new HttpParams()
    params = params.append('pageNumber', pageNumber?.toString());
    params = params.append('pageSize', pageSize?.toString());

    return params;
  }

}
