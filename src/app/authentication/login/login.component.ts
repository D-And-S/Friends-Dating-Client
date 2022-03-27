import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  model: any = {}

  constructor(public authService: AuthenticationService,
              private router:Router,
              private toastr:ToastrService) { } 

  ngOnInit(): void {
    //console.log('currentUserr', this.authService.currentUser$)
    //console.log('route..', this.router)
  }

  login() {
    this.authService.login(this.model).subscribe({
       next: (v) => {
        this.router.navigateByUrl('/')
       },
       error: (e)=>{
         //console.log(e)
         //this.toastr.error(e.error)
       }
    })
  }

}
