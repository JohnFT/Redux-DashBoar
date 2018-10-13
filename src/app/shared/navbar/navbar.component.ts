import { Component, OnInit, OnDestroy } from '@angular/core';

import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { User } from 'src/app/auth/user.model';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  public user: User;
  private subscription: Subscription = new Subscription();
  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('auth').pipe(
      filter(auth => !!auth)
    ).subscribe(auth => {
      this.user = auth.user;
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
