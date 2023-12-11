import { Component } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../Services/user.service';
import { FormsModule } from '@angular/forms';

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

  constructor(private userService: UserService){ 
   }

  registerUser(){
    this.userService.auth(this.user).subscribe({
      next: (data) =>{
        console.log(data);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
}
