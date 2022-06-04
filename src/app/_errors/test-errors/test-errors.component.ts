import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})

export class TestErrorsComponent implements OnInit {
  baseUrl = environment.apiUrl;
  validationErrors:string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }

  get500Error() {
    return this.http.get(this.baseUrl+'buggy/server-error').subscribe({
      next: (res)=>{
        console.log('r'+res)
      },
      error: (e)=>{
        //console.log(e)
      }
    });
  }

  get400Error() {
    this.http.get(this.baseUrl + 'buggy/bad-request').subscribe({
     next: (res) => {
       console.log('r'+res)
     },
     error: (e) => {
      // console.log(e)
     }
   })
 }

 
 get401Error() {
  this.http.get(this.baseUrl + 'buggy/auth').subscribe({
    next: (res) => {
      console.log('r'+res)
    },
    error: (e) => {
      //console.log(e)
    }
  })
}

  get404Error() {
    this.http.get(this.baseUrl + 'buggy/not-found').subscribe({
      next: (res) => {
        console.log('r'+res)
      },
      error: (e) => {     
        //console.log(e)
      }
    })
  }

  get400ValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (res) => {
        console.log('r'+res)
      },
      error: (e) => {
        this.validationErrors = e;
        console.log(e)
      }
    })
  }
}
