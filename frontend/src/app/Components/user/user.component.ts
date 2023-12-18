import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: User = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router){ 
   }

  registerUser(){
    this.userService.post(this.user).subscribe({
      next: (data) =>{
        alert("Successful registeration");
        this.router.navigate(['/delivery']);
      },
      error: (error) =>{
        alert("Error occured please try again");
      }
    });
  }
}
