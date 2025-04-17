import { Injectable } from '@angular/core';
import { ToDoItem } from './todo-list/todo-item.interface';
import { of } from 'rxjs';
// import { ToDoItem } from './todo-list/todo-item.interface';

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  getInitialTasks(): Promise<ToDoItem[]> {
    return new Promise<ToDoItem[]>((resolve, reject) => {
      setTimeout(() => {
        const tasks: ToDoItem[] = [
          {
            task: 'Learn Angular',
            completed: true,
            dueDate: new Date('2025-03-28'),
          },
          {
            task: 'Build a to-do list TEST',
            completed: false,
            dueDate: new Date('2025-03-31'),
          }
        ];

        if (tasks.length > 0) {
          resolve(tasks);
        } else {
          const errorMessage = 'No tasks found.';
          console.error(errorMessage);
          reject(errorMessage);
        }
      }, 5000);
    });
  }

  getEmptyTasks() {
    return new Promise<ToDoItem[]>((resolve, reject) => {
      const emptyList: ToDoItem[] = [];

      if (emptyList.length === 0) {
        resolve(emptyList);
      } else {
        const error = 'Expected an empty list but found tasks.';
        console.error(error);
        reject(error);
      }
    });
  }
}