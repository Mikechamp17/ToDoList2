import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component'
import { LoginFormComponent } from './login-form/login-form.component';

export const routes: Routes = [
    {
        path: 'todo',
        loadComponent: () =>
          import('./todo-list/todo-list.component').then(m => m.TodoListComponent),
    },
    {
        path: 'calculator',
        loadComponent: () =>
          import('./calculator/calculator.component').then(m => m.CalculatorComponent),
      },

    {
      path : 'registrationForm',
      loadComponent: () =>
        import('./registration-form/registration-form.component').then(m => m.RegistrationFormComponent),
    },
    {
      path : 'loginForm',
      loadComponent: () =>
        import('./login-form/login-form.component').then(m => m.LoginFormComponent),
    },
      
      
];
