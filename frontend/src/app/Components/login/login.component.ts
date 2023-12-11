import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../models/user-login';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: UserLogin = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService){ 
   }

  login(){
    this.loginService.auth(this.user).subscribe(
      {
      next: (data) =>{
        console.log(data);
      },
      error: (error) =>{
        console.log(error);
      }
    });
  }
}
