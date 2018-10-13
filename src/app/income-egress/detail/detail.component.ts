import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IncomeEgress } from '../income-egress.models';
import { IncomeEgressService } from '../income-egress.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: []
})
export class DetailComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();
  public items: IncomeEgress[];

  constructor(private _store: Store<AppState>, private _incomeEgressServie: IncomeEgressService) { }

  ngOnInit() {
    this.subscription = this._store.select('incomeEgress').subscribe(incomeEgress => {
      this.items = incomeEgress.items;
    });
  }

  public deleteItem(item: IncomeEgress) {
    this._incomeEgressServie.delteIncomeEgress(item.uid)
      .then(res => {
        Swal('Felicidades', `Se elimino el item ${item.description}`, 'success');
      })
      .catch(err => console.log(err));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
