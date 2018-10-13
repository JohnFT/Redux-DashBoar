import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filter } from 'rxjs/operators';
import { IncomeEgressService } from 'src/app/income-egress/income-egress.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  public user: User;
  private subscription: Subscription = new Subscription();
  constructor(private _authService: AuthService,
    private _store: Store<AppState>,
    private _incomeEgressServie: IncomeEgressService) { }



  ngOnInit() {
    this.subscription = this._store.select('auth').pipe(
      filter(auth => !!auth)
    ).subscribe(auth => {
      this.user = auth.user;
    });
  }

  public signUp() {
    this._authService.signup();
    this._incomeEgressServie.unsubscription();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
