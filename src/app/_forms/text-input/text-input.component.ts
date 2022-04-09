import { Component, Input, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent implements OnInit, ControlValueAccessor{
  @Input() label!:string;
  
  @Input() type = 'text';

  // @self() decorator use to inejct local services 
  // such as if I want to working ngControl we need to use self decorator to use ngControl as service
  constructor(@Self() public ngControl:NgControl) {
    this.ngControl.valueAccessor = this;
    //console.log(this.ngControl)
   }
  
  ngOnInit(): void {

  }

  // these function are take care by ControlValueAccessor we do not need to implement
  writeValue(obj: any): void {

  }

  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }

}
