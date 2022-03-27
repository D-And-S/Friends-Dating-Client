import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  errors :any;

  constructor(private router:Router) {
     // we can only access the router state inside the constructor 
     const navigation = this.router.getCurrentNavigation();
     //console.log('navigation', navigation?.extras.state)
     this.errors = navigation?.extras?.state?.['error'];
  }

  ngOnInit(): void {
      
  }


}
