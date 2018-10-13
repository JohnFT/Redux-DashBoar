import { Routes } from '@angular/router';
import { IncomeEgressComponent } from '../income-egress/income-egress.component';
import { StadisticComponent } from '../income-egress/stadistic/stadistic.component';
import { DetailComponent } from '../income-egress/detail/detail.component';


export const dashboardRoutes: Routes = [
    { path: '', component: StadisticComponent },
    { path: 'income-egress', component: IncomeEgressComponent },
    { path: 'detail', component: DetailComponent }
];

