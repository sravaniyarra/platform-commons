import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    email : new FormControl('',[Validators.required,Validators.email]),
    password : new FormControl('',[Validators.required])

  });

  constructor(private auth : AuthService){}

  register(){
    if(this.profileForm.valid){
        const email = this.profileForm.value.email!;
        const password = this.profileForm.value.password!;
        this.auth.register(email,password);
    }
  }
}
