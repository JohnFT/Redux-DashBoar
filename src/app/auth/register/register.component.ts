import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public isLoading: boolean;

  constructor(private authService: AuthService, private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  public onSubmit(data: any) {
    this.authService.createUser(data.name, data.email, data.password);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
