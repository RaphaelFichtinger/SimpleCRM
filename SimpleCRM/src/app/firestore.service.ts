import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDoc, doc, updateDoc, CollectionReference, DocumentData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { get } from 'firebase/database';
import { Task } from '../models/task.class';


@Injectable({
  providedIn: 'root'
})

export class FirestoreService {
  fireStore: Firestore = inject(Firestore);
  userList: User[] = [];
  unsubUsers:any;
  userId: string = "";
  user: User|any;

  taskList: Task[] = [];
  unsubTasks:any;
  taskId: string = "";
  task: Task|any;

  constructor( ) {
    this.unsubUsers = this.subUserList();
    this.unsubTasks = this.subTaskList();

  }


  async updateUser(user:User){
    let docRef = this.getUserRef('users', this.userId);
    await updateDoc(docRef, this.getCleanUserJson(user))
  }

  async updateTask(task:Task){
    let docRef = this.getTaskRef('tasks', this.taskId);
    await updateDoc(docRef, this.getCleanTaskJson(task))
  }







  async addUser(user: User) {
    const userData = { ...user }; 
    await addDoc(collection(this.fireStore, 'users'), userData)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding user: ", error);
      });
  }

  async addTask(task: Task) {
    const taskData = { ...task }; 
    await addDoc(collection(this.fireStore, 'tasks'), taskData)
      .then((docRef) => {
        console.log("Task written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding new Task: ", error);
      });
  }







  subUserList(){
    return onSnapshot(this.userCollectionRef(), (list) => {
      this.userList = [];
      list.forEach((element: any) => {
        this.userList.push(this.setUserObject(element.data(), element.id));
      });
      this.sortUsers()
    });
  }

  subTaskList(){
    return onSnapshot(this.taskCollectionRef(), (list) => {
      this.taskList = [];
      list.forEach((element: any) => {
        this.taskList.push(this.setTaskObject(element.data(), element.id));
      });
      this.sortTasks()
    });
  }






  getUser(){
    this.userCollectionRef();
    this.getUserRef('users', this.userId);
  }

  getTask(){
    this.taskCollectionRef();
    this.getTaskRef('tasks', this.taskId);
  }





  

  sortUsers() {
    this.userList.sort((a, b) => {
      if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) {
        return -1;
      }
      if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };

  sortTasks() {
    this.taskList.sort((a, b) => {
      if (a.employeeName.toLowerCase() < b.employeeName.toLowerCase()) {
        return -1;
      }
      if (a.employeeName.toLowerCase() > b.employeeName.toLowerCase()) {
        return 1;
      }
      return 0;
    });
  };







  setUserObject(data: any, id: string): User {
    return new User({
      id: id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      birthDate: data.birthDate,
      street: data.street,
      zipCode: data.zipCode,
      city: data.city,
      timestamp: data.timestamp
    });
  }

  setTaskObject(data: any, id: string): Task {
    return new Task({
      id: id,
      employeeName: data.employeeName,
      startTime: data.startTime,
      deadline: data.deadline,
      taskName: data.taskName,
      description: data.description,
      customerName: data.customerName,
      location: data.location,
    });
  }






  setUserId(userId: string) {
    this.userId = userId;
  }

  setTaskId(taskId: string){
    this.taskId = taskId;
  }


  ngOnDestroy() {
    this.unsubUsers();
    this.unsubTasks();
  }







  userCollectionRef() {
    return collection(this.fireStore, 'users'); 
  }

  taskCollectionRef() {
    return collection(this.fireStore, 'tasks'); 
  }





  getUserRef(colId: string, docId: string) {
    const collectionRef = collection(this.fireStore, colId);
    return doc(collectionRef, docId);
  }

  getTaskRef(colId: string, docId: string) {
    const collectionRef = collection(this.fireStore, colId);
    return doc(collectionRef, docId);
  }





  
  getCleanUserJson(user: User) {
    return {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      birthDate: user.birthDate,
      street: user.street,
      zipCode: user.zipCode,
      city: user.city
    };
  }

  getCleanTaskJson(task: Task) {
    return {
      employeeName: task.employeeName,
      startTime: task.startTime,
      deadline: task.deadline,
      taskName: task.taskName,
      customerName: task.customerName,
      location: task.location,
    };
  }
}
