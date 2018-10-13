import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { StadisticComponent } from './stadistic/stadistic.component';
import { SortIncomeEgressPipe } from './sort-income-egress.pipe';
import { IncomeEgressComponent } from './income-egress.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { IncomeEgressReducer } from './income-egress.reducers';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
    StoreModule.forFeature('incomeEgress', IncomeEgressReducer),
  ],
  declarations: [
    DashboardComponent,
    DetailComponent,
    StadisticComponent,
    SortIncomeEgressPipe,
    IncomeEgressComponent
  ]
})
export class IncomeEgressModule { }
