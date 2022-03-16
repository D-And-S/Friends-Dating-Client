import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter<boolean>() 
  model:any = {};

  constructor(private _authService:AuthenticationService) { }

  ngOnInit(): void {

  }

  register(){
    this._authService.register(this.model).subscribe(response=>{
      console.log('response',response)
      this.cancel();
    })
  }

  cancel(){
    this.cancelRegister.emit(false)
  } 

}
