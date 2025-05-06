import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import {RegistrationFormComponent} from './registration-form/registration-form.component'

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
      
];
