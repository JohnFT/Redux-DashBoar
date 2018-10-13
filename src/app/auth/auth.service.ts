import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubscription: Subscription = new Subscription();
  
  constructor(private _afAuth: AngularFireAuth,
    private _router: Router,
    private _afDb: AngularFirestore,
    private _store: Store<AppState>) { }

  public initAuthListener() {
    this._afAuth.authState.subscribe((fbUser: firebase.User) => {
      if (!!fbUser) {
        this.userSubscription = this._afDb.doc(`${fbUser.uid}/user`).valueChanges()
          .subscribe((userObj: any) => {
            const user = new User(userObj);
            this._store.dispatch(new SetUserAction(user));
          });

      } else {
        this.userSubscription.unsubscribe();
      }

    });
  }

  public async  createUser(name: string, email: string, password: string) {

    this._store.dispatch(new ActivateLoadingAction());
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
            this._store.dispatch(new DesactivateLoadingAction());
          })
          .catch(err => {
            console.error(err);
            Swal('Error en createUser', err.message, 'error');
            this._store.dispatch(new DesactivateLoadingAction());
          });

      })
      .catch(err => {
        console.error(err);
        Swal('Error en el register', err.message, 'error');
        this._store.dispatch(new DesactivateLoadingAction());
      });
  }

  public signin(email: string, password: string) {

    this._store.dispatch(new ActivateLoadingAction());
    this._afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this._store.dispatch(new DesactivateLoadingAction());
        this._router.navigate(['/']);
      })
      .catch(err => {
        this._store.dispatch(new DesactivateLoadingAction());
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
