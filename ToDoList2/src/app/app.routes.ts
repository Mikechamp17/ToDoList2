import { Routes } from '@angular/router';
import { CalculatorComponent } from './todo-list/calculator/calculator.component';

export const routes: Routes = [
    {
        path: 'todo',
        loadComponent: () =>
          import('./todo-list/todo-list.component').then(m => m.TodoListComponent),
    },
    {
        path: 'calculator',
        loadComponent: () =>
          import('./todo-list/calculator/calculator.component').then(m => m.CalculatorComponent),
      }
      
];
