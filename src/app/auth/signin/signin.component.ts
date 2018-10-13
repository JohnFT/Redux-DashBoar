import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: []
})
export class SigninComponent implements OnInit, OnDestroy {


  public isLoading: boolean;
  private subscription: Subscription;

  constructor(private _authService: AuthService,
    private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  public onSubmit(data) {
    this._authService.signin(data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
