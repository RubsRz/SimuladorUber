import { Injectable } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth'; //"@angulat/fire/auth"
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth, private router: Router) { }

  FacebookAuth() {
    return this.AuthLogin(new auth.FacebookAuthProvider())
  }
  AuthLogin(provider:any) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result)=>{
      console.log('Logged in succesfull');
      this.router.navigateByUrl('/map');
    })
    .catch((error)=> {
      console.log(error);
    })
  }
}
