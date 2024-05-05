import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDoc, doc, updateDoc, CollectionReference, DocumentData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';
import { get } from 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  fireStore: Firestore = inject(Firestore);
  userList: User[] = [];
  unsubUsers:any;
  userId: string = "";


  constructor( ) {
    this.unsubUsers = this.subUserList();
    
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

  subUserList(){
    return onSnapshot(this.userCollectionRef(), (list) => {
      this.userList = [];
      list.forEach((element: any) => {
        console.log(this.userList);
        
        this.userList.push(this.setUserObject(element.data(), element.id));

        
      });
      this.sortUsers()
    });
  }



  getUser(){
    this.userCollectionRef();
    this.getUserRef('users', this.userId);
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

  setUserId(userId: string) {
    this.userId = userId;
  }

  ngOnDestroy() {
    this.unsubUsers();
   
  }

  userCollectionRef() {
    return collection(this.fireStore, 'users'); // collection refference
  }

  getUserRef(colId:any, docId: string) {
    return doc(collection(this.fireStore, docId), this.userId);
  }
}
