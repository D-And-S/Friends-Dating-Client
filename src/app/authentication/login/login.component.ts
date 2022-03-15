import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {}

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    //console.log('currentUserr', this.authService.currentUser$)
  }

  login() {
    this.authService.login(this.model).subscribe((result) => {/*console.log(result)*/ })
  }

}
