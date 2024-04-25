import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import {MatCardModule} from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatCardModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

userId:string = "";


constructor(private route: ActivatedRoute) { }

ngOnInit(): void {
  this.route.paramMap.subscribe(paramMap => {   // gets the userID from the URL
    const userId = paramMap.get('id');
    if (userId !== null) {
      this.userId = userId;
    }
  });
}

}