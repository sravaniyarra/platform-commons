import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUserSubject = new BehaviorSubject<any>(null); // to track the logged-in user
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private fireauth: AngularFireAuth, private router: Router) {
    this.fireauth.authState.subscribe(user => {
      if (user) {
        this.currentUserSubject.next(user); // Set the current user
      } else {
        this.currentUserSubject.next(null); // No user logged in
      }
    });
  }

  //login Method

  login(email:string,password : string){
    this.fireauth.signInWithEmailAndPassword(email,password).then(()=>{
     localStorage.setItem('token','true');
      this.router.navigate(['event-details'])
    },err=>{
      alert(err.message)
        this.router.navigate(['/login'])
    })
  }

  //Register method

  register(email:string,password:string){
    this.fireauth.createUserWithEmailAndPassword(email,password).then(()=>{
      alert("Registration Successfull!!")
      this.router.navigate(['/login'])
    },err =>{
      alert(err.message)
      this.router.navigate(['/register'])
    })
  }
  logout(){
      this.fireauth.signOut().then(()=>{
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      },err=>{
        
          alert(err.message)
      })
  }

  getCurrentUser() {
    return this.currentUserSubject.value; // Return current user data
  }
}
