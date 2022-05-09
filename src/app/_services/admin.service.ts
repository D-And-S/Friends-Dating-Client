import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    // we use partial<User[]> because we are getting little data of users not all user data
    return this.http.get<Partial<User[]>>(environment.apiUrl + 'admin/users-with-roles')
  }

  updateUserRoles(username: string, roles: string[]) {
    //console.log('?roles=' + roles)
    return this.http.post(environment.apiUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {})
  }
}
