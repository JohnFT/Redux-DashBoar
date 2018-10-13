import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { IncomeEgress } from '../income-egress.models';

@Component({
  selector: 'app-stadistic',
  templateUrl: './stadistic.component.html',
  styles: []
})
export class StadisticComponent implements OnInit {

  public incomes: number;
  public egress: number;
  public countIncomes: number;
  public countEgress: number;

  private subscription: Subscription = new Subscription();

  public doughnutChartLabels: string[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: number[] = [];

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this._store.select('incomeEgress').subscribe(incomeEgress => {
      this.countIncomeEgress(incomeEgress.items);
    });
  }

  private countIncomeEgress(items: IncomeEgress[]) {
    this.incomes = 0;
    this.egress = 0;

    this.countIncomes = 0;
    this.countEgress = 0;
    items.forEach(item => {
      if (item.type === 'income') {
        this.countIncomes++;
        this.incomes += item.value;
        return;
      }
      this.countEgress++;
      this.egress += item.value;
      return;
    });

    this.doughnutChartData = [this.incomes, this.egress];
  }

}
