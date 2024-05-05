import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { User } from '../../models/user.class';
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDoc, doc, updateDoc, CollectionReference, DocumentData, setDoc } from '@angular/fire/firestore';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule,
    MatIcon
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  fireStore: Firestore = inject(Firestore);
  unsubSingle: any;
  userID: string = "";
  user: User = new User();
  userList: User[] = [];


  constructor(public route: ActivatedRoute, public fireService: FirestoreService) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      const userId = paramMap.get('id');
      if (userId !== null) {
        this.userID = userId;
      //  console.log('UserID:', this.userID); 
        this.fireService.setUserId(this.userID);
        this.getUser();
      }
    });
  }

  getUser() {
    this.unsubSingle = onSnapshot(this.getUserRef('users', this.userID), (user) => {
      if (user) {
        this.user = new User(user.data());
       // console.log('user is ', this.user);
      } else {
        console.log('User not found');
      }
    });
  }


  toJSON() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      birthDate: this.user.birthDate,
      street: this.user.street,
      zipCode: this.user.zipCode,
      city: this.user.city,
    };
  }


  getUserRef(colId: any, docId: any) {
    return doc(this.userCollectionRef(), docId); // Benutze den Wert von docId als Dokument-ID
  }


  userCollectionRef() {
    return collection(this.fireStore, 'users'); // collection refference
  }

}