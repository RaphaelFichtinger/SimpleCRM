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



userId:string = "";
user: any = {};
userList: User[] = [];

constructor(public route: ActivatedRoute, public fireService: FirestoreService) { 
  this.fireService.setUserId(this.userId)
}

ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {   // gets the userID from the URL
    const userId = paramMap.get('id');
    console.log(userId);
    
    if (userId !== null) {
      this.userId = userId;
    
      this.userId = this.fireService.userId;
      console.log(this.userId);
      this.fireService.getUserRef(this.fireStore, this.userId)
    }
    
  });
}





}