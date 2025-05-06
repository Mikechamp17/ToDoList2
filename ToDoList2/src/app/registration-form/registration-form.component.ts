import { Component, inject, OnInit } from '@angular/core';
import {FormControl, FormGroup,} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {FormBuilder,ReactiveFormsModule} from '@angular/forms';
import { RegistrationForm } from './registration-form-interface';
import {Validators} from '@angular/forms';
///styling imports
import {ChangeDetectionStrategy,} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
//Date picker imports
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule,MatFormFieldModule,MatIconModule,MatInputModule,MatButtonModule,MatDatepickerModule, MatNativeDateModule,MatInputModule,CommonModule],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})

//private formBuilder = inject(FormBuilder); ask Jordan about this



export class RegistrationFormComponent {
  formBuilder = inject(FormBuilder);
  registrationForm = this.formBuilder.group({
    firstName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    lastName: new FormControl('',[Validators.required,Validators.minLength(3)]),
    emailAddress: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',[
      Validators.required,Validators.minLength(8),Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]),
    confirmPassword: new FormControl('',Validators.required),
    dob: new FormControl('', Validators.required),


  });

  get firstName() { return this.registrationForm.get('firstName'); }
  get lastName() { return this.registrationForm.get('lastName'); }
  get emailAddress() { return this.registrationForm.get('emailAddress'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }
  get dob() { return this.registrationForm.get('dob'); }

    


  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched(); 
      return;
    }
  
    console.log(this.registrationForm.value);
  }

  
}


