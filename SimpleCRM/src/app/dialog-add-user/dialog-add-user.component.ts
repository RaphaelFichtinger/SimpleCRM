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

@Component({
  selector: 'app-dialog-add-user',
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
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})

export class DialogAddUserComponent {
user:User = new User();
loading: boolean = false;
firstName: string = '';
lastName: string = '';
email: string = '';
birthDate: Date | null = null;
street: string = '';
zipCode: number | null = null;
city: string = '';

constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>, public firestoreService: FirestoreService) { }
fireService = inject(FirestoreService)

ngOnInit(): void{
}

saveUser() {
  this.loading = true;
  if (this.birthDate) {
    this.user.timestamp = new Date().getTime();
    this.user.birthDate = this.birthDate.getTime();
  }
  this.firestoreService.addUser(this.user)
    .then(() => {
      this.loading = false;
      console.log('User added successfully');
      this.dialogRef.close();
    })
    .catch(error => {
      console.error('Error adding user: ', error);
    });
}
}





