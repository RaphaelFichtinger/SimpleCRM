import { Component, NgModule, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltip, MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { FirestoreService } from '../firestore.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTooltip,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
user: User = new User();
userList: User[] = [];


constructor(public dialog: MatDialog, public firestoreService: FirestoreService) { }
fireService = inject(FirestoreService)


ngOnInit(): void{

}

openDialog(){
  this.dialog.open(DialogAddUserComponent);
}





}
