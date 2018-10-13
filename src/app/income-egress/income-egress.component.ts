import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IncomeEgress } from './income-egress.models';
import { IncomeEgressService } from './income-egress.service';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { ActivateLoadingAction, DesactivateLoadingAction } from '../shared/ui.actions';

@Component({
  selector: 'app-income-egress',
  templateUrl: './income-egress.component.html',
  styles: []
})
export class IncomeEgressComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public forma: FormGroup;
  public type = 'income';
  public isLoading: boolean;

  constructor(private _incomEgressService: IncomeEgressService,
    private _store: Store<AppState>) { }

  ngOnInit() {
    this.forma = new FormGroup({
      'description': new FormControl('', Validators.required),
      'value': new FormControl(0, Validators.min(1))
    });
    this.subscription = this._store.select('ui').subscribe(ui => this.isLoading = ui.isLoading);
  }

  public createIncome() {
    this._store.dispatch(new ActivateLoadingAction());

    const incomeEgress = new IncomeEgress({ ...this.forma.value, type: this.type });

    this._incomEgressService.createIncomeEgress(incomeEgress)
      .then(res => {

        Swal('Felicidades', `Se registo el ${this.type === 'income' ? 'ingreso' : 'egreso'}

        ${incomeEgress.description}`, 'success');
        this.forma.reset({
          value: 0
        });
        this._store.dispatch(new DesactivateLoadingAction());

      })
      .catch(err => {

        Swal('createIncomeEgress error', err.message, 'error');
        this._store.dispatch(new DesactivateLoadingAction());

      });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
