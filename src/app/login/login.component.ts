import { Component } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
        email : new FormControl('',[Validators.required, Validators.email]),
        password : new FormControl('',[Validators.required, Validators.minLength(6)])
   })

   constructor(private auth:AuthService){}

   login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email && password) {
        this.auth.login(email, password)
    } else {
      alert('Please enter a valid email and password.');
    }
  }
   }
}
