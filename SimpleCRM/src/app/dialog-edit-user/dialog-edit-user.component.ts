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

@Component({
  selector: 'app-dialog-edit-user',
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
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {


  user:User|any;
  loading:boolean = false;


constructor(
  public fireService : FirestoreService,
  public DialogRef : MatDialogRef<DialogEditUserComponent>
  ) {

}




saveUser(){
  
}
}
