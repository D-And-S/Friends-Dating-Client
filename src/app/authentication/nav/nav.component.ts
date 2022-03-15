import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  loggedIn!: boolean;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

  }

  login() {
    this.authService.login(this.model).subscribe((res) => {
         console.log(res)
         this.loggedIn = true;
      }
    )
  }

  logout(){
    this.loggedIn = false;
  }

}
