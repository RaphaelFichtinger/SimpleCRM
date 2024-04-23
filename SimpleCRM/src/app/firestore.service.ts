import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDoc, doc, updateDoc, CollectionReference, DocumentData, setDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  fireStore: Firestore = inject(Firestore);
  userList: User[] = [];
  items$: Observable<any>;
  items;




  constructor() { 
    this.items$ = collectionData(this.userCollectionRef());
    this.items = this.items$.subscribe( (list) => {
      list.forEach((element:any) => {
        console.log(element);
      });
    });
    this.items.unsubscribe();
  }



  userCollectionRef(){
    return collection(this.fireStore, 'users'); // collection refferenz
  }

  getUserRef(colId:string, docId:string){
    return doc(collection(this.fireStore, colId), (docId))

  }

  
}
