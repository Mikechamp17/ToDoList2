import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
//import { HeaderComponent } from '../header/header.component';
// Adding date picker

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskService } from '../task.service';
import { ToDoItem } from './todo-item.interface';




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
  ],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})

//Defines the structure of a to-do item with task and completed properties.
export class TodoListComponent implements OnInit {
  tasks: ToDoItem[] = []; // an array to store the todo itemas
  isEmpty: boolean = true;

  newDueDate: Date | null = null;
  newTask: string = ''; // A string to store the new task input
  isDarkMode: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // localStorage.setItem('todo-tasks', `[{"task":"local storage item","completed":true,"dueDate":"2023-01-01"}]`);
    this.loadTask();
  }

  loadTask(): void {
    // const savedTasks = localStorage.getItem('todo-tasks');
  
    // if (savedTasks) {
    //   this.tasks = JSON.parse(savedTasks);
    //   this.isEmpty = this.tasks.length === 0;
    // }
  
    // if (!savedTasks || this.isEmpty) {
      this.taskService.getInitialTasks()
        .then((initialTasks) => {
          console.log('our initias tasks are', initialTasks);
          this.tasks = initialTasks;
          this.isEmpty = initialTasks.length === 0;
          this.savedTasks(); // optional: save it to localStorage
        })
        .catch((error) => {
          console.error('Failed to load initial tasks:', error);
        });
    // }
  }

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
    }
  }

  toggleTask(index: number) {
    // toggles the completed status of th etask
    this.tasks[index].completed = !this.tasks[index].completed;
    this.savedTasks();
  }

  removeTask(index: number) {
    // removes the task from the tasks array
    this.tasks.splice(index, 1);
    this.savedTasks();
  }

  savedTasks(): void {
    localStorage.setItem('todo-tasks', JSON.stringify(this.tasks));
  }
  //dark mode
  toggleTheme(): void {
    // Add this method
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }


}
