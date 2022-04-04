import { Injectable } from '@angular/core';
import { CanActivate, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map, Observable } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private toastr: ToastrService) { }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) return true;
        this.toastr.error('Log in to continue');
        return false;
      })
    )
  }
}
