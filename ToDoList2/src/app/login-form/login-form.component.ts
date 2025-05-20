

import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { NgClass } from '@angular/common';


// Importing my LoginService 
import { LoginService } from '../login.service';
// Importing my LoginFormInterface 
import { LoginFormInterface } from './login-form-interface';

// Angular Material 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatButtonModule } from '@angular/material/button'; 
import { LoginRequest } from '../login.models';
   

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,    
    MatButtonModule,   
    NgClass
      
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss' 
})


export class LoginFormComponent { 
 formBuilder = inject(FormBuilder);
 private loginService: LoginService = inject(LoginService);


 loginForm:FormGroup<LoginFormInterface> = this.formBuilder.group({
    username: new FormControl<string>('', [Validators.required]),
    password: new FormControl<string>('', [Validators.required])
  });

 
  loginSuccessful: boolean = false; 
  loginAttempted: boolean = false; 
  feedbackMessage: string | null = null;


  onSubmit(): void { 
    this.loginAttempted = true;
    this.loginSuccessful = false; 
    this.feedbackMessage = null; 

   
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
    
      const username = this.loginForm.controls.username.value; ///
      const password = this.loginForm.controls.password.value; ///

      console.log('Attempting login with:', { username, password });

      const loginObj: LoginRequest = {
        username,
        password,
      }
      this.loginSuccessful = this.loginService.logIn(loginObj);

      if (this.loginSuccessful) {
        
        alert('Successfully logged in Mike!');
        this.feedbackMessage = 'Successfully logged in!';
        console.log('Login successful from component.');
      } else {
        this.feedbackMessage = 'Login failed. Somthing is wrong with your password or username!'; 
        console.log('Login failed from component.');
      }
    } else {
      this.feedbackMessage = 'Please fill in all required fields.';
      console.log('Login form is invalid.');
    }


  }

  } 




