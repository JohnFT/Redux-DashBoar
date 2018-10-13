import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afAuth: AngularFireAuth,
    private _router: Router,
    private _afDb: AngularFirestore) { }

  public initAuthListener() {
    this._afAuth.authState.subscribe((fbUser: firebase.User) => {
    });
  }

  public async  createUser(name: string, email: string, password: string) {
    this._afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(res => {

        const user: User = {
          uid: res.user.uid,
          name: name,
          email: res.user.email
        };

        this._afDb.doc(`${user.uid}/user`)
          .set(user)
          .then(response => {
            this._router.navigate(['/']);
          })
          .catch(err => {
            console.error(err);
            Swal('Error en createUser', err.message, 'error');
          });

      })
      .catch(err => {

        console.error(err);
        Swal('Error en el register', err.message, 'error');
      });
  }

  public signin(email: string, password: string) {

    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this._router.navigate(['/']);
      })
      .catch(err => {
        console.error(err);
        Swal('Error en el login', err.message, 'error');
      });

  }

  public signup() {
    this._router.navigate(['/signin']);
    this._afAuth.auth.signOut();
  }

  isAuth() {
    return this._afAuth.authState
      .pipe(
        map(fbUser => {
          if (!fbUser) {
            this._router.navigate(['signin']);
          }
          return !!fbUser;
        })
      );
  }
}
