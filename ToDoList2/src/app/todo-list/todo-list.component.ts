import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HeaderComponent } from '../header/header.component';

interface ToDoItem{
  task: string;
  completed: boolean;
  dueDate?: Date | null;
}

@Component({
  selector: 'app-todo-list',
  standalone:true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})

//Defines the structure of a to-do item with task and completed properties.
export class TodoListComponent implements OnInit {
  tasks: ToDoItem[] = [{task: 'learn Angular', completed: false, dueDate: new Date ('2025-03-28')},
    {task: 'build a to do list', completed: true, dueDate: null}
  ]; // an array to store the todo itemas

  newDueDate: Date| null = null
  newTask: string = ''; // A string to store the new task input 

  ngOnInit(): void {
    
  }
  addTask() { //This adds a new task to the tasks array 
    if (this.newTask.trim()) {
      this.tasks.push({ task: this.newTask, completed: false, dueDate: this.newDueDate });
      this.newTask = '';
      this.newDueDate = null;
    }
  }

  toggleTask(index: number) { // toggles the completed status of th etask 
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  removeTask(index: number) { // removes the task from the tasks array 
    this.tasks.splice(index, 1);
}

}
