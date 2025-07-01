import { Component, OnInit, OnDestroy, inject, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule


import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../task.service';
import { ToDoItem } from './todo-item.interface';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { filter, interval, map, Subscription, switchMap, takeUntil, takeWhile } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'; // Import takeUntilDestroyed for automatic unsubscription

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [
   
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})

//Defines the structure of a to-do item with task and completed properties.
export class TodoListComponent implements OnInit, OnDestroy {
  tasks: ToDoItem[] = []; // an array to store the todo itemas
  isEmpty: boolean = true;

  newDueDate: Date | null = null;
  newTask: string = ''; // A string to store the new task input
  isDarkMode: boolean = false;
  isLoading: boolean = false;

  // For testing and expirmenting
  loadEmptyTasks: boolean = false;

  // private tasksSubscribtion: Subscription | undefined;

  destroyRef = inject(DestroyRef);
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    console.log('TodoListComponent: NgOnInit called');
    this.isLoading = true;

    if (this.loadEmptyTasks === true) {
      // this.loadTasksEmpty();
      this.taskService.getInitialTasksEmpty().subscribe({
        next: (initialTasks: ToDoItem[]) => {
          this.isLoading = false;
          this.tasks = initialTasks;
          this.isEmpty = initialTasks.length === 0;
          this.savedTasks();
        },
        error: (error: any) => {
          console.error('TodoListComponent: Failed to load EMPTY initial tasks via Observable:', error);
          this.isLoading = false;
          this.tasks = [];
          this.isEmpty = true;
        },
        complete: () => {
          console.log('TodoListComponent: Empty tasks loaded successfully via Observable');
        },
      });
    } else {
      // takeUntilDestroyed(this.destroyRef)
      this.taskService
        .getInitialTasks()
        .pipe(
          switchMap((initialTasks) =>
            interval(1000).pipe(
              map(() => initialTasks), 
            )
          )
        ).pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (initialTasks: ToDoItem[]) => {
            console.log('in subscribe next');
            this.isLoading = false;
            this.tasks = initialTasks;
            this.isEmpty = initialTasks.length === 0;
            this.savedTasks(); // optional: save it to localStorage
          },
          error: (error: any) => {
            console.error('TodoListComponent:  Failed to load initial tasks via observable:');
            this.isLoading = false;
            this.tasks = [];
            this.isEmpty = true;
          },
          complete: () => {
            console.log('TodoListComponent:  Initial tasks loaded successfully via observable');
          },
        });
    }
  }

  // loadTask(): void {
  //     console.log('TodoListComponent: Attempting to load tasks via observable');
  //     this.tasksSubscribtion = this.taskService.getInitialTasks().subscribe({
  //       next:(initialTasks: ToDoItem[]) => {
  //         this.isLoading = false;
  //         this.tasks = initialTasks;
  //         this.isEmpty =initialTasks.length === 0;
  //         this.savedTasks(); // optional: save it to localStorage
  //     },
  //     error: (error: any) => {
  //       console.error('TodoListComponent:  Failed to load initial tasks via observable:');
  //       this.isLoading = false;
  //       this.tasks = [];
  //       this.isEmpty = true;
  //     },
  //     complete: () => {
  //       console.log('TodoListComponent:  Initial tasks loaded successfully via observable');
  //     }
  //     });
  // }

  // loadTasksEmpty(): void {
  //   console.log('TodoListComponent: Attempting to load EMPTY tasks via Observable');
  //   // CORRECTED: Call getInitialTasksEmpty() from the service
  //   this.tasksSubscribtion = this.taskService.getInitialTasksEmpty().subscribe({
  //     next: (initialTasks: ToDoItem[]) => {
  //       this.isLoading = false;
  //       this.tasks = initialTasks;
  //       this.isEmpty = initialTasks.length === 0;
  //       this.savedTasks();
  //     },
  //     error: (error: any) => {
  //       console.error('TodoListComponent: Failed to load EMPTY initial tasks via Observable:', error);
  //       this.isLoading = false;
  //       this.tasks = [];
  //       this.isEmpty = true;
  //     },
  //     complete: () => {
  //       console.log('TodoListComponent: Empty tasks loaded successfully via Observable');
  //     }
  //   });
  // }

  addTask() {
    //This adds a new task to the tasks array
    if (this.newTask.trim()) {
      this.tasks.push({
        task: this.newTask,
        completed: false,
        dueDate: this.newDueDate,
      });
      this.newTask = '';
      this.newDueDate = null;
      this.savedTasks();
      this.isEmpty = this.tasks.length === 0; // Update isEmpty based on tasks length
    }
  }

  toggleTask(index: number) {
    // toggles the completed status of th etask
    this.tasks[index].completed = !this.tasks[index].completed;
    this.savedTasks();
    this.isEmpty = this.tasks.length === 0;
  }

  removeTask(index: number) {
    // removes the task from the tasks array
    this.tasks.splice(index, 1);
    this.savedTasks();
    this.isEmpty = this.tasks.length === 0;
  }

  savedTasks(): void {
    localStorage.setItem('todo-tasks', JSON.stringify(this.tasks));
  }
  ngOnDestroy(): void {
    // Unsubscribe from the tasks subscription to prevent memory leaks
    // if (this.tasksSubscribtion) {
    //   this.tasksSubscribtion.unsubscribe();
    //   console.log('TodoListComponent: Unsubscribed from tasks loading observable');
    // }
  }
}
