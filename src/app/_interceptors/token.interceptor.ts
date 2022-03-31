import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../_models/user';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser!: User | null;

    //this.authService.currentUser$.pipe(take(1)).subscribe()
    this.authService.currentUser$.pipe(take(1)).subscribe({
      next: (user) => {
        //console.log('current user' +user)
        currentUser = user;
      }
    });

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request);
  }
}
