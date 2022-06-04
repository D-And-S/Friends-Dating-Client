import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  //@ViewChild('loginForm') myLoginForm!:ElementRef
  model: any = {}

  constructor(public authService: AuthenticationService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    //console.log('currentUserr', this.authService.currentUser$)
    //console.log('route..', this.router)
  }

  login() {
    const isEmpty = Object.keys(this.model).length === 0;
    if (isEmpty) {
      this.toastr.error("Please enter your username and password")
      return;
    }

    if (this.model.UserName == undefined) {
      this.toastr.error("Please enter your username")
      return
    }

    if (this.model.Password == undefined) {
      this.toastr.error("Please enter your Password")
      return
    }

    this.authService.login(this.model).subscribe({
      next: (v) => {
        this.router.navigateByUrl('/members')
      },
      error: (e) => {
        //console.log(e)
        //this.toastr.error(e.error)
      }
    })
  }

}
