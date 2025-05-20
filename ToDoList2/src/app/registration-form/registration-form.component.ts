


import { Component, inject } from '@angular/core';
import {
  AbstractControl, 
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors, 
  Validators
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RegistrationForm } from './registration-form-interface'; // RegistrationDetails unused in this component

// Styling imports
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgClass
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.scss'
})
export class RegistrationFormComponent {
  formBuilder = inject(FormBuilder);

  registrationForm: FormGroup<RegistrationForm> = this.formBuilder.group({
    firstName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl<string>('', [Validators.required, Validators.minLength(3)]),
    emailAddress: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    ]),
    confirmPassword: new FormControl<string>('', Validators.required),
    dob: new FormControl<string>('', Validators.required),
  }, {
    validators: this.passwordMatchValidator
  });

 
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const errorKey = 'mismatch'; 

    if (!password || !confirmPassword || password === confirmPassword) {
      if (control.get('confirmPassword')?.hasError(errorKey)) {
        const currentErrors = control.get('confirmPassword')?.errors;
        if (currentErrors && Object.keys(currentErrors).length > 1) {
          delete currentErrors[errorKey];
          control.get('confirmPassword')?.setErrors(currentErrors);
        } else {
          control.get('confirmPassword')?.setErrors(null);
        }
      }
      return null;
    }

    const error = { [errorKey]: true }; // create a validiation function include it in your validators validationErrors | null
    control.get('confirmPassword')?.setErrors(error);
    return error;
  }
 

  onSubmit() {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      console.log('Form is invalid. Group errors:', this.registrationForm.errors);
      Object.keys(this.registrationForm.controls).forEach(key => {
        const controlErrors = this.registrationForm.get(key)?.errors;
        if (controlErrors) {
          console.log(`Errors on control '${key}':`, JSON.stringify(controlErrors));
        }
      });
      return;
    }

    console.log('Form Submitted Successfully!');
    console.log(this.registrationForm.value);

    const firstName = this.registrationForm.controls.firstName.value;
    console.log('First name is', firstName);

    const lastName = this.registrationForm.controls.lastName.value;
    console.log('Last name is', lastName);

    const dob = this.registrationForm.controls.dob.value;
    console.log('Date of Birth is', dob);

    const emailAddress = this.registrationForm.controls.emailAddress.value;
    console.log('Email address is', emailAddress);

    const password = this.registrationForm.controls.password.value;
    console.log('Password is', password);

    const confirmPassword = this.registrationForm.get('confirmPassword')?.value;
    console.log('Confirm password is', confirmPassword); ///check with jordan



  }
}
  
