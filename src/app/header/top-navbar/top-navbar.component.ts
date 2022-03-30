import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';


@Component({
  selector: 'app-top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.component.css']
})
export class TopNavbarComponent implements OnInit {

  constructor(public authService:AuthenticationService,
              private router:Router) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/')
  }

}
