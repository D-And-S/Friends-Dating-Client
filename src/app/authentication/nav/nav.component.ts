import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/_models/user.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}
  currentUser$!: Observable<User | null>;

  constructor(public authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log('currentUserr', this.authService.currentUser$)
  }


  login() {
    this.authService.login(this.model).subscribe((result) => {
         //console.log(result)
      }
    )
  }

  logout(){
    this.authService.logout()
  }



 

}
