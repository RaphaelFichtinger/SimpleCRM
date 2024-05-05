import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { User } from '../../models/user.class';
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDoc, doc, updateDoc, CollectionReference, DocumentData, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  
fireStore: Firestore = inject(Firestore);
unsubSingle:any;


userID:string = "";
user: User = new User();
userList: User[] = [];

constructor(public route: ActivatedRoute, public fireService: FirestoreService) { 
  this.fireService.setUserId(this.userID)
}

ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {   // gets the userID from the URL
    const userId = paramMap.get('id');
    if (userId !== null) {
      this.userID = userId;
      console.log(this.userID);
      this.getUser();
    }
    
  });
}

getUser(){
  this.unsubSingle = onSnapshot(this.getUserRef('users', this.userID ), (user) => {
    this.user = new User(user);
    console.log('user is ', user.data());
    
    
  })
}




getUserRef(colId: any, docId: any) {
  return doc(this.userCollectionRef(), this.userID);
}

userCollectionRef() {
  return collection(this.fireStore, 'users'); // collection refference
}

}