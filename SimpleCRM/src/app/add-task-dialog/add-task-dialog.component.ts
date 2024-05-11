import { Component, NgModule, inject } from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../firestore.service';
import { CommonModule, NgFor } from '@angular/common';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { Task } from '../../models/task.class';

@Component({
  selector: 'app-add-task-dialog',
  standalone: true,
  providers: provideNativeDateAdapter(),
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    NgFor,
    MatProgressBarModule,
    CommonModule
  ],
  templateUrl: './add-task-dialog.component.html',
  styleUrl: './add-task-dialog.component.scss'
})
export class AddTaskDialogComponent {
  user:User = new User();
firstName: string = '';
lastName: string = '';
email: string = '';
birthDate: Date | null = null;
street: string = '';
zipCode: number | null = null;
city: string = '';


  task:Task = new Task();
  loading: boolean = false;
  employeeName: string = '';
  startTime: Date | null = null;
  deadline: Date | null = null;
  taskName: string = '';
  description: string = '';
  customerName: string = '';
  location: string = '';


  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>, public firestoreService: FirestoreService) { }
  fireService = inject(FirestoreService)


  ngOnInit():void{

  }



  saveTask(){
      this.loading = true;
      if (this.startTime) {
        this.task.timestamp = new Date().getTime();
        this.task.startTime = this.startTime.getTime();
      } 
      if (this.deadline) {
        this.task.timestamp = new Date().getTime();
        this.task.deadline = this.deadline.getTime();
      } 
      this.firestoreService.addTask(this.task)
        .then(() => {
          this.loading = false;
          console.log('Task added successfully');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error adding task: ', error);
        });
    }
    }


