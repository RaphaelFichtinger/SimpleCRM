import { Component, OnDestroy, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { UserComponent } from '../user/user.component';
import { Subscription } from 'rxjs';
import { CommonModule } from "@angular/common"; 

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DashboardComponent,
    UserComponent,
    CommonModule
      ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit, OnDestroy {

  time = new Date();
  intervalId:any;
  subscription: Subscription|any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
