import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule, DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
// Ensure this path is correct based on your file structure!
import { FBService, Task } from '../FB.service';
import { Router } from '@angular/router';

// Angular Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-to-do-list-fb',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatListModule,
    MatCheckboxModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './to-do-list-fb.component.html',
  styleUrls: ['./to-do-list-fb.component.scss']
})
export class ToDoListFbComponent implements OnInit {
  tasks$!: Observable<Task[]>;

  // FIX #2: Changed the type definition for newTask to be more direct
  newTask: { name: string; completed: boolean; dueDate?: Date } = {
    name: '',
    completed: false,
    dueDate: undefined
  };

  constructor(private fbService: FBService) { }

  ngOnInit() {
    this.tasks$ = this.fbService.getTasks();
  }

  addTask() {
    if (this.newTask.name.trim() !== '') {
      this.fbService.addTask(this.newTask)
        .then(() => {
          this.newTask.name = '';
          this.newTask.dueDate = undefined;
        })
        // FIX #3: Added (err: any)
        .catch((err: any) => console.error('Error adding task:', err));
    }
  }

  deleteTask(taskId: string | undefined) {
    if (taskId) {
      this.fbService.deleteTask(taskId)
        // FIX #3: Added (err: any)
        .catch((err: any) => console.error('Error deleting task:', err));
    }
  }

  toggleCompletion(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.fbService.updateTask(updatedTask)
      // FIX #3: Added (err: any)
      .catch((err: any) => console.error('Error updating task:', err));
  }
}