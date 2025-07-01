// src/app/FB.service.ts

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Task {
  id?: string;
  name: string;
  completed: boolean;
  dueDate?: any;
}

@Injectable({
  providedIn: 'root'
})
export class FBService {
  private taskCollection = collection;

  constructor(private firestore: Firestore) {
    this.taskCollection = collection(this.firestore, 'tasks');
  }

  getTasks(): Observable<Task[]> {
    return collectionData(this.taskCollection, { idField: 'id' }) as Observable<Task[]>;
  }

  addTask(task: Omit<Task, 'id'>) {
    return addDoc(this.taskCollection, task);
  }

  deleteTask(taskId: string) {
    const taskDoc = doc(this.firestore, `tasks/${taskId}`);
    return deleteDoc(taskDoc);
  }

  updateTask(task: Task) {
    const taskDoc = doc(this.firestore, `tasks/${task.id}`);
    const { id, ...data } = task;
    return updateDoc(taskDoc, { ...data });
  }
}