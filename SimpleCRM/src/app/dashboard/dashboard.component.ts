import { Component } from '@angular/core';
import { FirestoreService } from '../firestore.service';
import { MatCard } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddTaskDialogComponent } from '../add-task-dialog/add-task-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCard,
    RouterLink,
    MatIconModule,
    MatButton,
    MatDialogModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor( 
    public firestoreService: FirestoreService,
    public dialog: MatDialog) { }


openDialog(){
  this.dialog.open(AddTaskDialogComponent);
}


}
