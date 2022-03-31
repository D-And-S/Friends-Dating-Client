import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router, private toastr:ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        //console.log(error)
        //console.log(error.error.errors)
        if(error){
          switch (error.status) {
            // if we have list of error 400 error
            case 400:
              if(error.error.errors){               
                 const modalStateErrors = [];
                 for (const key in error.error.errors) {
                   if(error.error.errors[key]){
                    modalStateErrors.push(error.error.errors[key])
                   }
                 }
                 // for show list of error in page like registration error
                 // registration error is not suitable for display through toaster
                 // that's why we throw errors
                 throw modalStateErrors.flat();

              }else {
                // for general 400 error 
                 this.toastr.error("Bad Request", error.status)
              }
              break;

            case 401:
              this.toastr.error("Un-Authorized Access", error.status);
              break; 

            case 404:
              this.router.navigateByUrl('/not-found')
              break
            
            case 500:
              // to show the details of the error. to do that we can use navigationExtras
              const navigationExtras: NavigationExtras = {state: {error:error.error}}
              this.router.navigateByUrl('/server-error',navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected went wrong')
              console.log(error);
              break;
          }
        }
        return throwError(()=> new Error(error));
      })
    );
  }
}
