import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserLogin } from '../../models/user-login';
import { LoginService } from '../../Services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user: UserLogin = new UserLogin();

  constructor(private loginService: LoginService, private router: Router){ 
   }

  login(){
    console.log( this.user);
    this.loginService.post(this.user).subscribe(
      {
      next: (data) =>{
        alert("Login successful");
        this.router.navigate(['/delivery']);
      },
      error: (error) =>{
        alert("Error occured please try again");
      }
    });
  }
}
