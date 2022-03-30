import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Friends Dating';
  
  constructor(private _http: HttpClient, 
              private _authService:AuthenticationService
             ){}

  ngOnInit(): void {
    this.setCurrentUser()
  }

  
  setCurrentUser(){
    const user: User =  JSON.parse(localStorage.getItem('user')!)
    this._authService.setCurrentUser(user)
    //console.log('setCurrentObject',user)
 }



}
