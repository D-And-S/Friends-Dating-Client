import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private authService:AuthenticationService,
              private toastr:ToastrService) { }

  ngOnInit(): void {

  }

  register(){
    this.authService.register(this.model).subscribe({
      next:(v) => {
      // console.log('response',response)
       this.cancel();
      },
      error:(e)=>{
        this.toastr.error(e.error)
      }
    })
  }

  cancel(){
    this.cancelRegister.emit(false)
  } 

}
