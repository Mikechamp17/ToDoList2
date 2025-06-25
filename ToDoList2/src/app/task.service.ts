import { Injectable } from '@angular/core';
import { ToDoItem } from './todo-list/todo-item.interface';
import { Observable,of,throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators'; 




//   getInitialTasks(): Observable<ToDoItem[]> {
  
//         const tasks: ToDoItem[] = [
//           {
//             task: 'Learn Angular',
//             completed: true,
//             dueDate: new Date('2025-03-28'),
//           },
//           {
//             task: 'Build a to-do list TEST',
//             completed: false,
//             dueDate: new Date('2025-03-31'),
//           }
//         ];

//         if (tasks.length > 0) {
//           resolve(tasks);
//         } else {
//           const errorMessage = 'No tasks found.';
//           console.error(errorMessage);
//           reject(errorMessage);
//         }
//       }, 5000);
//     });
//   }

//   getInitialTasksEmpty(): Promise<ToDoItem[]> {
//     return new Promise<ToDoItem[]>((resolve, reject) => {
//       setTimeout(() => {
//         const tasks: ToDoItem[] = [];
//           resolve(tasks);  
//       }, 5000);
//     });
//   }

//   getEmptyTasks() {
//     return new Promise<ToDoItem[]>((resolve, reject) => {
//       const emptyList: ToDoItem[] = [];

//       if (emptyList.length === 0) {
//         resolve(emptyList);
//       } else {
//         const error = 'Expected an empty list but found tasks.';
//         console.error(error);
//         reject(error);
//       }
//     });
//   }
// }

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  // Change: Now returns Observable<ToDoItem[]>
  getInitialTasks(): Observable<ToDoItem[]> {
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

    
    return of(tasks).pipe(
      delay(5000), // Simulate 5 seconds network delay
      catchError(error => {
     
        console.error('TaskService: Error in getInitialTasks Observable pipe:', error);
        return throwError(() => new Error('Failed to load initial tasks from service.'));
      })
    );
  }

 
  getInitialTasksEmpty(): Observable<ToDoItem[]> {
    const tasks: ToDoItem[] = [];

    return of(tasks).pipe(
      delay(5000) 
   
    );
  }

  getEmptyTasks(): Observable<ToDoItem[]> {
    const emptyList: ToDoItem[] = [];
    return of(emptyList); 
  }

  simulateErrorLoadingTasks(): Observable<ToDoItem[]> {
    return throwError(() => new Error('Simulated API load error! Please try again.')).pipe(
      delay(2000) 
    );
  }
}

