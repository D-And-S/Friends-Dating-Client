import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;

  constructor(private router:Router) { }

  ngOnInit(): void {
    var getUser = localStorage.getItem('user')

    if(getUser !== null){
      this.router.navigateByUrl('/members')
    }
  }

  registerToggle(){
    this.registerMode = !this.registerMode
  }

  cancelRegisterMode(event:boolean){
    this.registerMode = event;
  }

  

}
