
import { Injectable } from '@angular/core';
import { LoginRequest } from './login.models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

logIn(params: LoginRequest): boolean {
  
  let isValid: boolean = false;
    if (params.username === 'mikechamp' && params.password === 'angular19') {
      console.log('LoginService: Login successful for', params.username);
      isValid = true;
    }
    
    console.log('LoginService: Login failed for', params.username);
    return isValid; 
  }
}
