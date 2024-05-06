import { Component, inject } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatCardModule } from '@angular/material/card';
import { FirestoreService } from '../firestore.service';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Firestore, collectionData, collection, addDoc, onSnapshot, getDoc, doc, updateDoc, CollectionReference, DocumentData, setDoc } from '@angular/fire/firestore';


@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [    
    MatCard,
    MatCardModule,
    MatIcon,
    MatMenuModule,
    MatLabel,
    MatFormField,
    CommonModule,
    FormsModule,
    MatDialogActions,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {

  user:User|any;
  loading:boolean = false;
  Firestore = inject(Firestore)

constructor(
  public fireService : FirestoreService,
  public DialogRef : MatDialogRef<DialogEditAddressComponent>
  ) {

}


saveUser() {
  if (this.user) {
    this.fireService.updateUser(this.user);
  } else {
    console.error("Kein Benutzer zum Aktualisieren vorhanden.");
  }
}




}