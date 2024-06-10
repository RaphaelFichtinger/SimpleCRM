import { Component, NgModule, inject } from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
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
import { Firestore, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

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

  fireStore: Firestore = inject(Firestore);


  task:Task = new Task();
  loading: boolean = false;
  employeeName: string = '';
  startTime: Date | null = null;
  deadline: Date | null = null;
  taskName: string = '';
  description: string = '';
  customerName: string = '';
  location: string = '';

  tasks: Task[] = []; // Array to hold tasks
  unsubSingle: any;
  taskID: string = "";
  dialogRef: any;


  constructor(
    public route: ActivatedRoute, 
    public fireService: FirestoreService, 
    public dialog : MatDialog) {
      this.getTasks();
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('id');
      if (this.task.id !== null) {
        this.taskID = this.task.id;
      //  console.log('UserID:', this.userID); 
        this.fireService.setTaskId(this.taskID);
        this.getTasks();
        console.log();
        
      }
    });
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
      this.fireService.addTask(this.task)
        .then(() => {
          this.loading = false;
          console.log('Task added successfully');
          this.dialogRef.close();
        })
        .catch(error => {
          console.error('Error adding task: ', error);
        });
    }


    getTasks() {
      this.unsubSingle = onSnapshot(this.getTaskRef('tasks', this.taskID), (task) => {
        if (task) {
          this.task = new Task(task.data());
          console.log(task.data());
          
         // console.log('user is ', this.user);
        } else {
          console.log('User not found');
        }
      });
    }

    getTaskRef(colId: any, docId: any) {
      return doc(collection(this.fireStore, colId), docId); // Use collection and doc correctly
    }

    taskCollectionRef() {
      return collection(this.fireStore, 'tasks'); // collection refference
    }
  
    }


