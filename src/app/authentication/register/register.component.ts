import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter<boolean>()
  //model: any = {};
  registerForm!: FormGroup | any;
  maxDate!:Date;
  showGenderValidation = true;
  validationErrors:string[] = [];

  constructor(private authService: AuthenticationService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  initializeForm() {
    // by using Form Group
    /*this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required), 
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)
      ]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
    })*/

    // by using form builder code will little less and simplify
    this.registerForm = this.fb.group({
      gender: ['',Validators.required],
      username: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ],
      ],    
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8)
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
          this.matchValues('password')
        ]
      ],
    })
  }

  // custom validator 
  // return type ValidatorFn
  // we checked for wheather any control value matches with other control
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl | any) => {
      //console.log(control)
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  register() {
    //console.log(this.registerForm.value)
    //console.log(this.model = this.registerForm.value)
    this.authService.register(this.registerForm.value).subscribe({
      next:(v) => {
      // console.log('response',response)
      this.router.navigateByUrl('/members');
       this.cancel();   
      },
      error:(e)=>{
        this.validationErrors = e;
      }
    })
  }

  changeGender(e:any){
    this.showGenderValidation = false;
  }

  cancel() {
    this.cancelRegister.emit(false)
  }

}
