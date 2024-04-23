import { Component, NgModule, inject } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms';
import { FirestoreService } from '../firestore.service';




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
],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',

})
export class DialogAddUserComponent {
user:User = new User();
birthDate!: Date;

constructor() { }
fireService = inject(FirestoreService)
ngOnInit(): void{
}

saveUser(){
  this.user.birthDate = this.birthDate.getTime();
  console.log('current user is', this.user);
}





}
