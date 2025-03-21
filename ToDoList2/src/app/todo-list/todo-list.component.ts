import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

interface ToDoItem{
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss'
})

//Defines the structure of a to-do item with task and completed properties.
export class TodoListComponent {
  tasks: ToDoItem[] = []; // an array to store the todo itemas
  newTask: string = ''; // A string to store the new task input 

  addTask() { //This adds a new task to the tasks array 
    if (this.newTask.trim()) {
      this.tasks.push({ task: this.newTask, completed: false });
      this.newTask = '';
    }
  }

  toggleTask(index: number) { // toggles the completed status of th etask 
    this.tasks[index].completed = !this.tasks[index].completed;
  }

  removeTask(index: number) { // removes the task from the tasks array 
    this.tasks.splice(index, 1);
}
}
